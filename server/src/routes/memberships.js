import { Router } from 'express'
import { db } from '../db/index.js'
import { memberships } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { auth } from '../auth.js'
import { fromNodeHeaders } from 'better-auth/node'

const router = Router()

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

// POST /api/memberships/select - Select or subscribe to a membership plan (Protected)
router.post('/select', async (req, res) => {
    try {
        // Verify active user session via Better Auth
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

        // --- OPTION: Save the membership choice in the database ---
        // If your 'user' table has a membership column, update it like this:
        /*
        await db.update(user)
            .set({ membershipId: planId })
            .where(eq(user.id, userId))
        */
        // Or if you use a separate subscriptions table, insert it here using Drizzle.

        console.log(`User ${userId} selected membership plan: ${planId}`)

        return res.status(200).json({
            success: true,
            message: 'Membership plan selected successfully!'
        })
    } catch (error) {
        console.error('Error selecting membership plan:', error)
        res.status(500).json({ error: 'Could not process membership selection' })
    }
})

export default router