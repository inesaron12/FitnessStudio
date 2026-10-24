import { useState } from 'react'
import { signIn } from '../lib/auth'

export function Login({ onSwitchToRegister }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Authenticate user using Better Auth client
            const { error: authError } = await signIn.email({
                email,
                password,
                callbackURL: '/', // Redirect path after successful login
            })

            if (authError) {
                setError(authError.message || 'Invalid email or password')
            } else {
                // Redirect or refresh window upon successful authentication
                window.location.href = '/'
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-main">Welcome Back</h1>
                    <p className="mt-2 text-sm text-muted">
                        Sign in to access your PulseStudio account and bookings
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-main mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-main outline-none focus:border-accent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-main mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-main outline-none focus:border-accent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-[#e03232] disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {onSwitchToRegister && (
                    <div className="mt-6 text-center text-sm text-muted">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToRegister}
                            className="font-medium text-accent hover:underline cursor-pointer"
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}