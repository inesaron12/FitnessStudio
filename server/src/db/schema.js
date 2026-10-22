import { pgTable, serial, text, decimal, integer, boolean, json } from 'drizzle-orm/pg-core'

// 1. Classes table
export const classes = pgTable('classes', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    category: text('category').notNull(),
    intensity: text('intensity').notNull(),
    image: text('image').notNull(),
    description: text('description').notNull(),
})

// 2. Staff / Trainers table
export const trainers = pgTable('trainers', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    image: text('image').notNull(),
    bio: text('bio').notNull(),
})

// 3. Plans / Memberships table
export const memberships = pgTable('memberships', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),             // e.g., 'basic', 'pro', 'vip'
    name: text('name').notNull(),                     // e.g., 'Day Pass'
    price: decimal('price', { precision: 10, scale: 2 }).notNull(), // e.g., 15.00
    duration: text('duration').notNull(),             // e.g., 'per day', 'per month'
    description: text('description').notNull(),
    features: json('features').notNull(),             // Guardará la lista de características como JSON
    popular: boolean('popular').default(false).notNull(), // Indica si es el plan destacado
})

// 4. Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
})

// 5. Bookings table
export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    classId: integer('class_id').references(() => classes.id).notNull(),
})