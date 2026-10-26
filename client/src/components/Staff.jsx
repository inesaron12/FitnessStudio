import { useState, useEffect } from 'react'
import { TrainerCard } from './TrainerCard'

// Dynamic API URL: points to Render in production (Vercel) or localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function Staff() {
    // State to store trainers fetched from the backend API
    const [trainers, setTrainers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch trainers from backend on component mount
    useEffect(() => {
        fetch(`${API_URL}/api/trainers`)
            .then((res) => res.json())
            .then((data) => {
                setTrainers(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching trainers:', err)
                setIsLoading(false)
            })
    }, [])

    return (
        <section id="staff" className="mx-auto max-w-[1100px] px-6 py-12">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-main">Our Staff</h2>
                <p className="text-sm text-muted mt-1">
                    Expert coaches dedicated to guiding your fitness journey.
                </p>
            </div>

            {isLoading ? (
                <p className="text-center py-12 text-muted">Loading staff...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.map((trainer) => (
                        <TrainerCard key={trainer.id} trainer={trainer} />
                    ))}
                </div>
            )}
        </section>
    )
}