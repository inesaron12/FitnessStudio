import { trainers } from '../data/trainers'
import { TrainerCard } from './TrainerCard'

export function Staff() {
    return (
        <section id="staff" className="mx-auto max-w-[1100px] px-6 py-12">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-main">Our Staff</h2>
                <p className="text-sm text-muted mt-1">
                    Expert coaches dedicated to guiding your fitness journey.
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                    <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
            </div>
        </section>
    )
}