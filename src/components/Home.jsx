export function Home() {
    return (
        <section id="home" className="mx-auto max-w-[1100px] px-6 pt-20 pb-16">
            <p className="mb-4 text-xs tracking-[0.15em] text-muted uppercase">
                Elite training · Professional coaching
            </p>
            <h1 className="max-w-xl text-6xl leading-[1.05] font-bold text-main">
                Own your <span className="text-accent">energy</span> every day.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
                High-intensity classes, expert guidance, and the community to push you further.
                No shortcuts, just real results.
            </p>
            <a
                href="#membership"
                className="mt-8 inline-block rounded-full bg-accent px-7 py-3 font-semibold text-white transition hover:-translate-y-px hover:bg-[#e03232]"
            >
                Become a member
            </a>
        </section>
    )
}