---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, fetch it from the issue tracker and state its title before starting. If the reference is ambiguous, ask.

Create a dedicated branch for each issue, including when a request spans multiple issues. Do not commit directly to `main`.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with "code-review" to review the work.

Deploy only to the `dev` stage for issue verification until release. The dev stage mirrors the production infrastructure; do not use production deployments for testing.

For each issue, commit its work to its dedicated branch, push that branch, and open a separate pull request linked to the issue.
