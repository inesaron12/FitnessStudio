import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { db } from './db/index.js'
import * as schema from './db/schema.js'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    // Asegura que use tu URL de Render en producción
    baseURL: process.env.BETTER_AUTH_URL || 'https://pulsestudio.onrender.com',
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    trustedOrigins: [
        process.env.CLIENT_URL,
        'https://fitness-studio-git-main-ines-464f.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000'
    ].filter(Boolean),
    advanced: {
        defaultCookieAttributes: {
            sameSite: 'none',
            secure: true,
        },
    },
})