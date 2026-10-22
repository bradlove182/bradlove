<script lang="ts">
    import { M } from "@bradlove/motion"
</script>

<section class="flex flex-col gap-4 px-8 py-40">
    <M.span
        animation="rise"
        duration={800}
        class="text-accent font-mono text-xs tracking-wider uppercase"
    >
        (Hello)
    </M.span>
    <M.p
        letters="grow"
        stagger={20}
        class="font-heading max-w-5xl text-[clamp(28px,3.8vw,72px)] leading-[1.05] tracking-tight"
    >
        I'm Brad, a developer in <span class="text-accent">Cape Town.</span> I build websites and
        web apps that <em>load fast,</em> make the case for your business and are easy for your team to
        run.
    </M.p>
</section>
