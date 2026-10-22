import { pgTable, serial, text, decimal } from 'drizzle-orm/pg-core'

// 1. Classes table (HIIT, Yoga, Strength, etc.)
export const classes = pgTable('classes', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(), // e.g., 'hiit-blitz'
    name: text('name').notNull(),         // e.g., 'HIIT Blitz'
    category: text('category').notNull(), // e.g., 'HIIT'
    intensity: text('intensity').notNull(), // e.g., 'High Intensity'
    image: text('image').notNull(),       // e.g., '/images/hiit.png'
    description: text('description').notNull(),
})

// 2. Staff / Trainers table
export const trainers = pgTable('trainers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),         // e.g., 'Alex Rivera'
    role: text('role').notNull(),         // e.g., 'Head Strength Coach'
    image: text('image').notNull(),       // e.g., '/images/Trainer1.png'
    bio: text('bio').notNull(),           // Short biography or description
})

// 3. Plans / Memberships table
export const memberships = pgTable('memberships', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),         // e.g., 'Pro Member'
    price: decimal('price', { precision: 10, scale: 2 }).notNull(), // e.g., 89.00
    duration: text('duration').notNull(), // e.g., 'per month'
    description: text('description'),     // Details or plan features
})
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core'
import { classes } from './schema.js' // (o dentro del mismo archivo)

// ... (tus tablas anteriores de classes, trainers, memberships)

// 4. Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(), // Nota: en producción debe ir hasheada con bcrypt
})

// 5. Bookings table (Relación muchos a muchos entre usuarios y clases)
export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    classId: integer('class_id').references(() => classes.id).notNull(),
})