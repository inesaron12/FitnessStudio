import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '../lib/auth'
import { formatPrice } from '../lib/format'

export function MembershipCard({ plan }) {
    const navigate = useNavigate()
    // Fetch active user session to check authentication status
    const { data: session } = useSession()

    const [isLoading, setIsLoading] = useState(false)

    // Handle plan selection action by sending a request to the backend API
    const handleChoosePlan = async () => {
        if (!session) {
            // Redirect user to login if not authenticated
            navigate('/login')
            return
        }

        try {
            setIsLoading(true)

            // Send POST request to the server with the membership plan ID
            const response = await fetch('http://localhost:3000/api/memberships/select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Crucial for sending Better Auth session cookies
                body: JSON.stringify({ planId: plan.id }),
            })

            if (response.ok) {
                alert('Membership plan selected successfully!')
                navigate('/') // Redirect to home page after successful selection
            } else {
                const errorData = await response.json()
                console.error('Failed to select plan:', errorData)
                alert(errorData.error || 'Failed to select plan. Please try again.')
            }
        } catch (err) {
            console.error('Network error during plan selection:', err)
            alert('Network error. Please check your connection.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <article
            className={`relative flex flex-col justify-between rounded-2xl border p-6 transition ${plan.popular
                ? 'border-accent bg-card shadow-lg shadow-accent/10'
                : 'border-border bg-card/60 hover:border-accent/50'
                }`}
        >
            {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                </span>
            )}

            <div>
                <h3 className="text-xl font-bold text-main">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-main">
                        {formatPrice(plan.price)}
                    </span>
                    <span className="text-sm font-medium text-muted">/{plan.duration}</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-muted">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                onClick={handleChoosePlan}
                disabled={isLoading}
                className={`mt-8 w-full rounded-full py-2.5 text-sm font-semibold transition cursor-pointer disabled:opacity-50 ${plan.popular
                    ? 'bg-accent text-white hover:bg-[#e03232]'
                    : 'border border-border text-main hover:border-accent hover:text-accent'
                    }`}
            >
                {isLoading ? 'Processing...' : 'Choose Plan'}
            </button>
        </article>
    )
}