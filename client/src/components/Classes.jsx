import { useState } from 'react'
import { classesList } from '../data/classes'
import { ClassCard } from './ClassCard'

const categories = ['All', 'HIIT', 'Yoga', 'Strength']

export function Classes() {
    const [filter, setFilter] = useState('All')

    const filtered =
        filter === 'All'
            ? classesList
            : classesList.filter((item) => item.category === filter)

    return (
        <section id="classes" className="mx-auto max-w-[1100px] px-6 py-12">
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-main">Explore our classes</h2>


                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`rounded-full px-4 py-1.5 text-sm transition cursor-pointer ${filter === cat
                                ? 'bg-accent text-white'
                                : 'border border-border text-muted hover:border-accent'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((item) => (
                    <ClassCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}