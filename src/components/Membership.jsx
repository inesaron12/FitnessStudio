import { plans } from '../data/plans'
import { MembershipCard } from './MembershipCard'

export function Membership() {
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