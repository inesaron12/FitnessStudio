import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '../lib/auth'
import { BookmarkToggle } from './BookmarkToggle'

export function ClassCard({ item }) {
    const navigate = useNavigate()
    // Fetch active session to check user authentication status
    const { data: session } = useSession()

    const [isSaved, setIsSaved] = useState(false)

    // Handle class booking action
    const handleBookSpot = () => {
        if (!session) {
            // Redirect to login if user is not authenticated
            navigate('/login')
        } else {
            // Proceed with booking action
            console.log('Booking spot for class:', item.id)
            // TODO: Implement booking API request
        }
    }

    // Handle bookmark / favorite toggle action
    const handleToggleBookmark = () => {
        if (!session) {
            // Redirect to login if user is not authenticated
            navigate('/login')
        } else {
            // Toggle bookmark state if authenticated
            setIsSaved(!isSaved)
        }
    }

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
                        onToggle={handleToggleBookmark}
                    />
                </div>

                <p className="mt-2 text-sm text-muted">{item.description}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {item.intensity || 'All Levels'}
                    </span>
                    <button
                        type="button"
                        onClick={handleBookSpot}
                        className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#e03232] cursor-pointer"
                    >
                        Book Spot
                    </button>
                </div>
            </div>
        </article>
    )
}