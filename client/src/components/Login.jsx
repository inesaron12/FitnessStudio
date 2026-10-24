import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { signIn, signUp } from "../lib/auth";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    // Detect if current route is /signup automatically
    const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

    // Keep state synchronized if user navigates via header links
    useEffect(() => {
        setIsSignUp(location.pathname === "/signup");
    }, [location.pathname]);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle form submission for both login and signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                // Sign Up flow
                await signUp.email({
                    email,
                    password,
                    name,
                    callbackURL: "/",
                });
            } else {
                // Sign In flow
                await signIn.email({
                    email,
                    password,
                    callbackURL: "/",
                });
            }
            // Redirect to home after successful authentication
            navigate("/");
        } catch (err) {
            setError(err.message || "An error occurred during authentication.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-dark px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">

                {/* Back to Home link */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center text-xs font-semibold text-muted transition hover:text-accent"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-main">
                    {isSignUp ? "Create an Account" : "Welcome Back"}
                </h2>
                <p className="mt-1 text-sm text-muted">
                    {isSignUp
                        ? "Enter your details to register"
                        : "Sign in to access your PulseStudio account"}
                </p>

                {/* Error message display */}
                {error && (
                    <div className="mt-4 rounded-xl bg-accent/10 p-3 text-xs text-accent">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-medium text-muted">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={isSignUp}
                                className="mt-1 w-full rounded-xl border border-border bg-dark px-4 py-2 text-sm text-main focus:border-accent focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-muted">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full rounded-xl border border-border bg-dark px-4 py-2 text-sm text-main focus:border-accent focus:outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-muted">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded-xl border border-border bg-dark px-4 py-2 text-sm text-main focus:border-accent focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                        {loading
                            ? "Processing..."
                            : isSignUp
                                ? "Sign Up"
                                : "Sign In"}
                    </button>
                </form>

                {/* Toggle between Sign In and Sign Up */}
                <div className="mt-6 text-center text-xs text-muted">
                    {isSignUp ? (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="font-semibold text-accent hover:underline cursor-pointer"
                            >
                                Sign In
                            </button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="font-semibold text-accent hover:underline cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}