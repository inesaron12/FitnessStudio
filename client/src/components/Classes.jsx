import { useState, useEffect } from 'react'
import { ClassCard } from './ClassCard'

// Use VITE_API_URL in production (Render) or fallback to localhost during development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const categories = ['All', 'HIIT', 'Yoga', 'Strength']

export function Classes() {
    // State to store classes fetched from the backend API
    const [classesList, setClassesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    // Fetch classes from backend on component mount
    useEffect(() => {
        fetch(`${API_URL}/api/classes`) // 👈 Usamos la variable aquí
            .then((res) => res.json())
            .then((data) => {
                setClassesList(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching classes:', err)
                setIsLoading(false)
            })
    }, [])

    // Filter classes based on selected category
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

            {isLoading ? (
                <p className="text-center py-12 text-muted">Loading classes...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((item) => (
                        <ClassCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}