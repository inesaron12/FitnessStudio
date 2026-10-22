import { useState } from 'react'
import { BookmarkToggle } from './BookmarkToggle'

export function ClassCard({ item }) {

    const [isSaved, setIsSaved] = useState(false)

    return (
        <article className="overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent">
            <img
                src={item.image}
                alt={item.name}
                className="h-[180px] w-full object-cover"
            />
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-semibold text-main">{item.name}</h3>
                        <p className="text-sm text-muted">{item.category}</p>
                    </div>


                    <BookmarkToggle
                        isBooked={isSaved}
                        onToggle={() => setIsSaved(!isSaved)}
                    />
                </div>

                <p className="mt-2 text-sm text-muted">{item.description}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {item.intensity || 'All Levels'}
                    </span>
                    <button className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#e03232]">
                        Book Spot
                    </button>
                </div>
            </div>
        </article>
    )
}