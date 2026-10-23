import { Router } from 'express'
import { db } from '../db/index.js'
import { memberships } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = Router()

// GET /api/memberships - Obtener todos los planes
router.get('/', async (req, res) => {
    try {
        const allMemberships = await db.select().from(memberships)
        res.json(allMemberships)
    } catch (error) {
        console.error('Error fetching memberships:', error)
        res.status(500).json({ error: 'Failed to fetch memberships' })
    }
})

// GET /api/memberships/:slug - Obtener un plan específico por su slug (ej: 'pro')
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

export default router