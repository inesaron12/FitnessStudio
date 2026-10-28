import { Router } from 'express'
import { db } from '../db/index.js'
import { memberships, orders } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { auth } from '../auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import Stripe from 'stripe'

const router = Router()

// Inicializar Stripe con la clave secreta del .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// GET /api/memberships - Get all plans
router.get('/', async (req, res) => {
    try {
        const allMemberships = await db.select().from(memberships)
        res.json(allMemberships)
    } catch (error) {
        console.error('Error fetching memberships:', error)
        res.status(500).json({ error: 'Failed to fetch memberships' })
    }
})

// GET /api/memberships/:slug - Get just one membership by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params
        const [membership] = await db
            .select()
            .from(memberships)
            .where(eq(memberships.slug, slug))

        if (!membership) {
            return res.status(404).json({ error: 'Membership plan not found' })
        }

        res.json(membership)
    } catch (error) {
        console.error('Error fetching membership details:', error)
        res.status(500).json({ error: 'Failed to fetch membership details' })
    }
})

// POST /api/memberships/select - Create Stripe Checkout Session & Order (Protected)
router.post('/select', async (req, res) => {
    try {
        // 1. Verify active user session via Better Auth (Login Check)
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized: Please log in to choose a plan' })
        }

        const userId = session.user.id
        const { planId } = req.body

        if (!planId) {
            return res.status(400).json({ error: 'Plan ID is required' })
        }

        // 2. Look up the product's real price from the database (Never trust the browser)
        const [plan] = await db
            .select()
            .from(memberships)
            .where(eq(memberships.id, planId))

        if (!plan) {
            return res.status(404).json({ error: 'Membership plan not found in database' })
        }

        // 3. Create a Stripe Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: plan.name,
                        description: plan.description || 'PulseStudio Membership Plan',
                    },
                    unit_amount: Math.round(plan.price * 100), // Stripe trabaja en centavos
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing`,
            metadata: {
                userId: userId,
                membershipId: plan.id,
            },
        })

        // 4. Create the order record in database with 'pending' status
        await db.insert(orders).values({
            id: stripeSession.id, // Usamos el ID de la sesión de Stripe como identificador de la orden
            userId: userId,
            status: 'pending',
            amountTotal: plan.price.toString(),
        })

        console.log(`Checkout session created for user ${userId}, Plan: ${plan.name}`)

        // 5. Return the Stripe Checkout URL to the frontend
        return res.status(200).json({
            success: true,
            url: stripeSession.url // El frontend usará esto para redirigir a Stripe
        })

    } catch (error) {
        console.error('Error creating checkout session:', error)
        res.status(500).json({ error: 'Could not process payment session' })
    }
})

export default router