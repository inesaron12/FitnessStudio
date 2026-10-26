import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '../lib/auth'
import { BookmarkToggle } from './BookmarkToggle'

export function ClassCard({ item }) {
    const navigate = useNavigate()
    // Fetch active session to check user authentication status
    const { data: session } = useSession()

    const [isSaved, setIsSaved] = useState(false)
    const [isBooking, setIsBooking] = useState(false)

    // Handle class booking action by sending a request to the backend API
    const handleBookSpot = async () => {
        if (!session) {
            // Redirect to login if the user is not authenticated
            navigate('/login')
            return
        }

        try {
            setIsBooking(true)

            // Send POST request to the server with the class ID
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Crucial for sending Better Auth session cookies
                body: JSON.stringify({ classId: item.id }),
            })

            if (response.ok) {
                alert('Spot booked successfully!')
            } else {
                const errorData = await response.json()
                console.error('Failed to book spot:', errorData)
                alert(errorData.error || 'Failed to book spot. Please try again.')
            }
        } catch (err) {
            console.error('Network error during booking:', err)
            alert('Network error. Please check your connection.')
        } finally {
            setIsBooking(false)
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
                        disabled={isBooking}
                        className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#e03232] cursor-pointer disabled:opacity-50"
                    >
                        {isBooking ? 'Booking...' : 'Book Spot'}
                    </button>
                </div>
            </div>
        </article>
    )
}