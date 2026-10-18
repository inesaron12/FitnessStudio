export function MembershipCard({ plan }) {
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
                    <span className="text-4xl font-extrabold text-main">${plan.price}</span>
                    <span className="text-sm font-medium text-muted">/{plan.period}</span>
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
                className={`mt-8 w-full rounded-full py-2.5 text-sm font-semibold transition cursor-pointer ${plan.popular
                    ? 'bg-accent text-white hover:bg-[#e03232]'
                    : 'border border-border text-main hover:border-accent hover:text-accent'
                    }`}
            >
                Choose Plan
            </button>
        </article>
    )
}