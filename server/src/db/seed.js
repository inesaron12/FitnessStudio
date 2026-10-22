import { db } from './index.js'
import { classes, trainers, memberships } from './schema.js'
import { classesData } from './classes.data.js'
import { trainersData } from './trainers.data.js'
import { membershipsData } from './memberships.data.js'

async function seed() {
    console.log('🌱 Seeding database with initial data...')
    try {
        // Insert classes
        await db.insert(classes).values(classesData).onConflictDoNothing()

        // Insert trainers
        await db.insert(trainers).values(trainersData).onConflictDoNothing()

        // Insert memberships
        await db.insert(memberships).values(membershipsData).onConflictDoNothing()

        console.log('✅ Database seeded successfully for all entities!')
    } catch (error) {
        console.error('❌ Error seeding database:', error)
    } finally {
        process.exit(0)
    }
}

seed()