export function Footer() {
    return (
        <footer className="border-t border-border bg-dark py-8 text-muted">
            <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-6 md:flex-row">

                <p className="text-sm font-medium text-main">
                    Pulse<span className="text-accent">Studio</span>. Own your energy.
                </p>


                <div className="flex gap-6 text-sm">
                    <a href="#home" className="transition-colors hover:text-accent">Home</a>
                    <a href="#membership" className="transition-colors hover:text-accent">Membership</a>
                    <a href="#classes" className="transition-colors hover:text-accent">Classes</a>
                    <a href="#staff" className="transition-colors hover:text-accent">Staff</a>
                </div>


                <p className="text-xs text-muted/70">
                    &copy; {new Date().getFullYear()} PulseStudio. All rights reserved.
                </p>
            </div>
        </footer>
    )
}