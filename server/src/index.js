import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import { db } from './db/index.js'
import { classes, trainers, bookings, bookmarks, orders } from './db/schema.js'
import { auth } from './auth.js'
import { toNodeHandler, fromNodeHeaders } from "better-auth/node"
import membershipsRouter from './routes/memberships.js'
import { eq, and } from 'drizzle-orm'

// 1. Inicializar Express y Stripe primero
const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.set("trust proxy", 1)

// 2. Stripe Webhook (Debe ir antes de express.json y express.urlencoded)
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature']
    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Cuando el pago se completa con éxito en Stripe
    if (event.type === 'checkout.session.completed') {
        const stripeSession = event.data.object

        // Actualizamos la orden a 'paid' en la base de datos de Neon
        await db.update(orders)
            .set({ status: 'paid' })
            .where(eq(orders.id, stripeSession.id))

        console.log(`✅ Orden ${stripeSession.id} marcada como PAGADA con éxito.`)
    }

    res.json({ received: true })
})

// 3. Middlewares globales de JSON y URL encoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middlewares de CORS
const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://fitness-studio-zeta.vercel.app",
    "https://fitness-studio-git-main-ines-464f.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}))

// --- BETTER AUTH ENDPOINT ---
app.all(/^\/api\/auth/, toNodeHandler(auth))

// --- FEATURE ROUTES ---
app.use('/api/memberships', membershipsRouter)

// --- DIRECT API ENDPOINTS ---

// GET: Fetch all classes
app.get('/api/classes', async (req, res) => {
    try {
        const allClasses = await db.select().from(classes)
        res.json(allClasses)
    } catch (error) {
        console.error('Error fetching classes:', error)
        res.status(500).json({ error: 'Failed to fetch classes' })
    }
})

// GET: Fetch all trainers
app.get('/api/trainers', async (req, res) => {
    try {
        const allTrainers = await db.select().from(trainers)
        res.json(allTrainers)
    } catch (error) {
        console.error('Error fetching trainers:', error)
        res.status(500).json({ error: 'Failed to fetch trainers' })
    }
})

// POST: Book a class (Protected by Better Auth)
app.post('/api/bookings', async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: new Headers({
                cookie: req.headers.cookie || '',
                authorization: req.headers.authorization || ''
            })
        })

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized: You must log in to book a class' })
        }

        const userId = session.user.id
        const { classId } = req.body

        const newBooking = await db.insert(bookings).values({
            userId,
            classId
        }).returning()

        res.status(201).json({
            message: 'Class booked successfully!',
            booking: newBooking[0]
        })
    } catch (error) {
        console.error('Error booking class:', error)
        res.status(500).json({ error: 'Could not process booking' })
    }
})

// ==========================================
// --- BOOKMARKS (FAVORITOS) ENDPOINTS ---
// ==========================================

// GET: Obtener las clases favoritas del usuario
app.get('/api/bookmarks', async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: new Headers({
                cookie: req.headers.cookie || '',
                authorization: req.headers.authorization || ''
            })
        })

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const userBookmarks = await db.select().from(bookmarks).where(eq(bookmarks.userId, session.user.id))
        res.json(userBookmarks)
    } catch (error) {
        console.error('Error fetching bookmarks:', error)
        res.status(500).json({ error: 'Failed to fetch bookmarks' })
    }
})

// POST: Añadir clase a favoritos
app.post('/api/bookmarks', async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: new Headers({
                cookie: req.headers.cookie || '',
                authorization: req.headers.authorization || ''
            })
        })

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const userId = session.user.id
        const { classId } = req.body

        const existing = await db.select().from(bookmarks).where(
            and(eq(bookmarks.userId, userId), eq(bookmarks.classId, classId))
        )

        if (existing.length > 0) {
            return res.status(200).json({ message: 'Already bookmarked' })
        }

        const newBookmark = await db.insert(bookmarks).values({
            userId,
            classId
        }).returning()

        res.status(201).json(newBookmark[0])
    } catch (error) {
        console.error('Error adding bookmark:', error)
        res.status(500).json({ error: 'Failed to add bookmark' })
    }
})

// DELETE: Quitar clase de favoritos
app.delete('/api/bookmarks', async (req, res) => {
    try {
        const session = status = await auth.api.getSession({
            headers: new Headers({
                cookie: req.headers.cookie || '',
                authorization: req.headers.authorization || ''
            })
        })

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const userId = session.user.id
        const { classId } = req.body

        await db.delete(bookmarks).where(
            and(eq(bookmarks.userId, userId), eq(bookmarks.classId, classId))
        )

        res.status(200).json({ message: 'Bookmark removed successfully' })
    } catch (error) {
        console.error('Error removing bookmark:', error)
        res.status(500).json({ error: 'Failed to remove bookmark' })
    }
})

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})