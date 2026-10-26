import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db/index.js'
import { classes, trainers, bookings } from './db/schema.js'
import { auth } from './auth.js'
import { toNodeHandler, fromNodeHeaders } from "better-auth/node"
import membershipsRouter from './routes/memberships.js'

const app = express()
app.set("trust proxy", 1)

// Middlewares
const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://fitness-studio-git-main-ines-464f.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean); // Filtra valores undefined si CLIENT_URL no está definida

app.use(cors({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como Postman o curl)
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
            headers: fromNodeHeaders(req.headers)
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

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})