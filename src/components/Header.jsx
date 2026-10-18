export function Header() {
    return (
        <header className="sticky top-0 z-10 border-b border-border bg-dark">
            <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
                <a href="#home" className="text-xl font-bold text-main">
                    Pulse<span className="text-accent">Studio</span>
                </a>
                <ul className="flex gap-6">
                    <li><a href="#home" className="text-muted transition-colors hover:text-accent">Home</a></li>
                    <li><a href="#classes" className="text-muted transition-colors hover:text-accent">Classes</a></li>
                    <li><a href="#staff" className="text-muted transition-colors hover:text-accent">Staff</a></li>
                    <li><a href="#membership" className="text-muted transition-colors hover:text-accent">Membership</a></li>
                    <li><a href="#contact" className="text-muted transition-colors hover:text-accent">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}