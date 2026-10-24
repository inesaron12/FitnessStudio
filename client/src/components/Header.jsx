import { useState } from 'react'
import { useSession, signOut } from '../lib/auth'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Classes', href: '#classes' },
    { name: 'Staff', href: '#staff' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
]

export function Header({ onOpenLogin }) {
    const [isOpen, setIsOpen] = useState(false)
    // Fetch active user session from Better Auth
    const { data: session, isPending } = useSession()

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.reload()
                },
            },
        })
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-dark/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="#home" className="text-xl font-extrabold tracking-wider text-main">
                    Pulse<span className="text-accent">Studio</span>
                </a>

                {/* Desktop Navigation */}
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

                {/* Desktop Auth Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    {!isPending && (
                        <>
                            {session ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-main">
                                        Hi, {session.user.name || session.user.email}
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={onOpenLogin}
                                    className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 cursor-pointer"
                                >
                                    Sign In
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-main md:hidden focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
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

                        {/* Mobile Auth Actions */}
                        {!isPending && (
                            <>
                                {session ? (
                                    <div className="pt-2 border-t border-border flex flex-col gap-2">
                                        <span className="text-xs text-muted">
                                            Signed in as: <strong className="text-main">{session.user.email}</strong>
                                        </span>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false)
                                                handleSignOut()
                                            }}
                                            className="w-full rounded-xl border border-border py-2 text-center text-xs font-semibold text-muted hover:text-accent cursor-pointer"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                            if (onOpenLogin) onOpenLogin()
                                        }}
                                        className="mt-2 inline-block rounded-xl bg-accent px-4 py-2 text-center text-xs font-semibold text-white cursor-pointer"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    )
}