import { useState, useEffect } from 'react'
import { MembershipCard } from './MembershipCard'

// Use VITE_API_URL in production (Render) or fallback to localhost during development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function Membership() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Fetch membership plans from the backend API using API_URL
        fetch(`${API_URL}/api/memberships`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch memberships')
                return res.json()
            })
            .then((data) => {
                setPlans(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Show loading state while fetching data
    if (loading) {
        return <div className="text-center py-12 text-muted">Loading memberships...</div>
    }

    // Show error state if something goes wrong
    if (error) {
        return <div className="text-center py-12 text-red-500">Error: {error}</div>
    }

    return (
        <section id="membership" className="mx-auto max-w-[1100px] px-6 py-12">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-main">Become a Member</h2>
                <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                    Choose the membership plan that best fits your goals and start training today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan) => (
                    <MembershipCard key={plan.id} plan={plan} />
                ))}
            </div>
        </section>
    )
}