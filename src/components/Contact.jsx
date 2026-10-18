export function Contact() {
    return (
        <section id="contact" className="mx-auto max-w-[1100px] px-6 py-16 text-center">
            <h2 className="text-3xl font-extrabold text-main">Contact Us</h2>
            <p className="mt-2 text-sm text-muted">
                Find us at the studio or reach out to start your fitness journey.
            </p>


            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                <div className="flex flex-col items-center">
                    <span className="text-2xl text-accent">📍</span>
                    <h3 className="mt-2 font-bold text-main">Location</h3>
                    <p className="mt-1 text-xs text-muted">123 Energy Way, Metro City</p>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col items-center">
                    <span className="text-2xl text-accent">📞</span>
                    <h3 className="mt-2 font-bold text-main">Phone</h3>
                    <p className="mt-1 text-xs text-muted">+1 (555) 019-2834</p>
                </div>


                <div className="flex flex-col items-center">
                    <span className="text-2xl text-accent">✉️</span>
                    <h3 className="mt-2 font-bold text-main">Email</h3>
                    <p className="mt-1 text-xs text-muted">hello@pulsestudio.com</p>
                </div>


                <div className="flex flex-col items-center">
                    <span className="text-2xl text-accent">⏰</span>
                    <h3 className="mt-2 font-bold text-main">Hours</h3>
                    <p className="mt-1 text-xs text-muted">Mon - Sun: 6:00 AM - 10:00 PM</p>
                </div>
            </div>
        </section>
    )
}