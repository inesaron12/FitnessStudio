export function TrainerCard({ trainer }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent">
            <img
                src={trainer.image}
                alt={trainer.name}
                className="h-[240px] w-full object-cover object-top"
            />
            <div className="p-5">
                <h3 className="font-bold text-lg text-main">{trainer.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mt-1">
                    {trainer.role}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                    {trainer.bio}
                </p>
            </div>
        </article>
    )
}