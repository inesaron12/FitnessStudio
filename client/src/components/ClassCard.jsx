import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '../lib/auth'
import { BookmarkToggle } from './BookmarkToggle'

const BACKEND_URL = 'https://pulsestudio.onrender.com'

export function ClassCard({ item }) {
    const navigate = useNavigate()
    const { data: session } = useSession()

    const [isSaved, setIsSaved] = useState(false)
    const [isBooking, setIsBooking] = useState(false)

    // 1. Cargar el estado de favorito desde el backend al iniciar sesión
    useEffect(() => {
        if (!session) {
            setIsSaved(false)
            return
        }

        const fetchBookmarkStatus = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/bookmarks`, {
                    credentials: 'include',
                })
                if (response.ok) {
                    const bookmarks = await response.json()
                    const isBookmarked = bookmarks.some(
                        (b) => b.classId === item.id
                    )
                    setIsSaved(isBookmarked)
                }
            } catch (err) {
                console.error('Error fetching bookmark status:', err)
            }
        }

        fetchBookmarkStatus()
    }, [session, item.id])

    // Manejar la reserva de la clase conectando directamente a Render
    const handleBookSpot = async () => {
        if (!session) {
            navigate('/login')
            return
        }

        try {
            setIsBooking(true)
            const response = await fetch(`${BACKEND_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ classId: item.id }),
            })

            if (response.ok) {
                alert('Spot booked successfully!')
            } else {
                const errorData = await response.json()
                alert(errorData.error || 'Failed to book spot. Please try again.')
            }
        } catch (err) {
            console.error('Network error during booking:', err)
            alert('Network error. Please check your connection.')
        } finally {
            setIsBooking(false)
        }
    }

    // 2. Sincronizar el cambio de favorito con el backend de Render
    const handleToggleBookmark = async () => {
        if (!session) {
            navigate('/login')
            return
        }

        try {
            const method = isSaved ? 'DELETE' : 'POST'
            const response = await fetch(`${BACKEND_URL}/api/bookmarks`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ classId: item.id }),
            })

            if (response.ok) {
                setIsSaved(!isSaved)
            } else {
                const errorData = await response.json()
                alert(errorData.error || 'Could not update bookmark.')
            }
        } catch (err) {
            console.error('Network error during bookmark toggle:', err)
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