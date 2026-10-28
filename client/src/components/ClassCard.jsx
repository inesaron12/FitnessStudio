import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '../lib/auth'
import { BookmarkToggle } from './BookmarkToggle'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function ClassCard({ item }) {
    const navigate = useNavigate()
    const { data: session } = useSession()

    const [isSaved, setIsSaved] = useState(false)
    const [isBooking, setIsBooking] = useState(false)

    // New states to handle day and time slot selection
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    // 1. Fetch bookmark status from backend on session start
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

    // Handle class booking connecting directly to the backend
    const handleBookSpot = async () => {
        if (!session) {
            navigate('/login')
            return
        }

        // Validate date and time selection before submitting
        if (!selectedDate || !selectedTime) {
            alert('Please select both a date and a time slot before booking.')
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
                body: JSON.stringify({
                    classId: item.id,
                    date: selectedDate,
                    time: selectedTime
                }),
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

    // 2. Sync bookmark toggle state with backend
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
        <article className="overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent flex flex-col justify-between">
            <div>
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

                    {/* Date and Time Selector Inputs */}
                    <div className="mt-4 space-y-3 bg-background/50 p-3 rounded-xl border border-border/60">
                        <div>
                            <label className="block text-xs font-medium text-muted mb-1">Select Day</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full rounded-lg border border-border bg-white text-slate-900 p-2 text-xs focus:outline-none focus:border-accent font-medium cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-muted mb-1">Select Time Slot</label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full rounded-lg border border-border bg-white text-slate-900 p-2 text-xs focus:outline-none focus:border-accent font-medium cursor-pointer"
                            >
                                <option value="" className="text-slate-400">Choose a time...</option>
                                <option value="09:00" className="text-slate-900">09:00 AM - Morning Session</option>
                                <option value="14:00" className="text-slate-900">02:00 PM - Afternoon Session</option>
                                <option value="18:30" className="text-slate-900">06:30 PM - Evening Session</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 pt-0">
                <div className="flex items-center justify-between border-t border-border pt-3">
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