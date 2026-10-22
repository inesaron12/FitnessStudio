import { useState } from 'react'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Classes', href: '#classes' },
    { name: 'Staff', href: '#staff' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-dark/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="#home" className="text-xl font-extrabold tracking-wider text-main">
                    Pulse<span className="text-accent">Studio</span>
                </a>


                <nav className="hidden items-center space-x-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-semibold uppercase tracking-wider text-muted transition hover:text-accent"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>


                <div className="hidden md:block">
                    <a
                        href="#membership"
                        className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                        Join Now
                    </a>
                </div>


                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-main md:hidden focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>


            {isOpen && (
                <nav className="border-t border-border bg-dark px-6 py-4 md:hidden">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-semibold uppercase tracking-wider text-muted hover:text-accent"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#membership"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 inline-block rounded-xl bg-accent px-4 py-2 text-center text-xs font-semibold text-white"
                        >
                            Join Now
                        </a>
                    </div>
                </nav>
            )}
        </header>
    )
}