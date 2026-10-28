import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export function SuccessPage() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const navigate = useNavigate()
    const [status, setStatus] = useState('Processing your payment...')

    useEffect(() => {
        if (sessionId) {
            // Here you could verify the session with your backend if needed
            setStatus('Payment Successful!')
        }
    }, [sessionId])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                    ✓
                </div>

                <h1 className="text-2xl font-extrabold text-main mb-2">
                    Payment Successful!
                </h1>

                <p className="text-sm text-muted mb-6">
                    Thank you for your purchase. Your membership has been activated successfully and your spot is ready to be booked.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/classes')}
                        className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-[#e03232] transition cursor-pointer"
                    >
                        Book a Spot (Select Day & Time)
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full rounded-full border border-border py-3 text-sm font-semibold text-main hover:border-accent hover:text-accent transition cursor-pointer"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}