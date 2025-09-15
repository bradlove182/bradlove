#!/usr/bin/env node

import { spawn } from 'child_process';
import { readdir, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the workspace root (three levels up from tools/cli/dist)
const workspaceRoot = join(__dirname, '..', '..', '..');

interface WorkspaceFolder {
  name: string;
  path: string;
  category: 'apps' | 'packages' | 'tools';
}

async function hasPackageJson(folderPath: string): Promise<boolean> {
  try {
    await access(join(folderPath, 'package.json'));
    return true;
  } catch {
    return false;
  }
}

async function getWorkspaceFolders(): Promise<WorkspaceFolder[]> {
  const categories: ('apps' | 'packages' | 'tools')[] = ['apps', 'packages', 'tools'];
  const folders: WorkspaceFolder[] = [];

  for (const category of categories) {
    const categoryPath = join(workspaceRoot, category);

    try {
      const items = await readdir(categoryPath, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          const folderPath = join(categoryPath, item.name);

          // Only include folders that have a package.json
          if (await hasPackageJson(folderPath)) {
            folders.push({
              name: item.name,
              path: folderPath,
              category
            });
          }
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not read ${category} directory`));
    }
  }

  return folders;
}

function runNcu(folder: WorkspaceFolder, interactive: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const mode = interactive ? 'interactive' : 'automatic';
    const flag = interactive ? '-i' : '-u';

    console.log(chalk.blue(`\n🔍 Updating dependencies for ${chalk.bold(folder.category)}/${chalk.bold(folder.name)} (${mode})...`));

    const child = spawn('ncu', [flag], {
      cwd: folder.path,
      stdio: interactive ? 'inherit' : ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    if (!interactive) {
      // Capture output for non-interactive mode
      let stdout = '';
      let stderr = '';

      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
    }

    child.on('close', (code: number | null) => {
      if (code === 0) {
        console.log(chalk.green(`✅ Completed ${folder.category}/${folder.name}`));
        resolve();
      } else if (code === 1 && interactive) {
        // Exit code 1 in interactive mode usually means user cancelled - treat as success
        console.log(chalk.yellow(`⚠️  ${folder.category}/${folder.name} - user cancelled or no updates needed`));
        resolve();
      } else {
        console.log(chalk.red(`❌ Failed ${folder.category}/${folder.name} (exit code: ${code})`));
        reject(new Error(`ncu failed for ${folder.category}/${folder.name} with exit code ${code}`));
      }
    });

    child.on('error', (error: Error) => {
      console.log(chalk.red(`❌ Error running ncu for ${folder.category}/${folder.name}: ${error.message}`));
      reject(error);
    });
  });
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const isNonInteractive = args.includes('--non-interactive') || args.includes('-n') ||
                           process.env.TURBO === '1' || process.env.CI === 'true';
  const showHelp = args.includes('--help') || args.includes('-h');

  if (showHelp) {
    console.log(chalk.cyan('🚀 Workspace Dependency Updater\n'));
    console.log('Usage: workspace-update [options]\n');
    console.log('Options:');
    console.log('  -i, --interactive     Run in interactive mode (default)');
    console.log('  -n, --non-interactive Run in non-interactive mode (auto-update)');
    console.log('  -h, --help           Show this help message\n');
    console.log('Examples:');
    console.log('  workspace-update                    # Interactive mode');
    console.log('  workspace-update --non-interactive  # Auto-update mode');
    console.log('  turbo run update-deps               # Auto-update via Turbo');
    return;
  }

  const interactive = !isNonInteractive;

  console.log(chalk.cyan('🚀 Workspace Dependency Updater'));
  console.log(chalk.gray(`Running in ${interactive ? 'interactive' : 'automatic'} mode\n`));

  try {
    const folders = await getWorkspaceFolders();

    if (folders.length === 0) {
      console.log(chalk.yellow('No workspace folders with package.json found.'));
      return;
    }

    console.log(chalk.blue(`Found ${folders.length} workspace(s):`));
    folders.forEach(folder => {
      console.log(chalk.gray(`  • ${folder.category}/${folder.name}`));
    });

    if (interactive) {
      console.log(chalk.yellow('\nNote: Running in interactive mode - you can select which packages to update.'));
      console.log(chalk.gray('Press Ctrl+C to cancel at any time.\n'));
    } else {
      console.log(chalk.yellow('\nNote: Running in automatic mode - all outdated packages will be updated.'));
      console.log(chalk.gray('Use --interactive flag for manual selection.\n'));
    }

    // Run ncu on each workspace
    for (const folder of folders) {
      try {
        await runNcu(folder, interactive);
      } catch (error) {
        console.log(chalk.yellow(`⚠️  Continuing with next workspace...`));
      }
    }

    console.log(chalk.green('\n🎉 All workspaces have been processed!'));

  } catch (error) {
    console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n⚠️  Process interrupted by user'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n\n⚠️  Process terminated'));
  process.exit(0);
});

main().catch((error) => {
  console.error(chalk.red('❌ Unhandled error:'), error);
  process.exit(1);
});
