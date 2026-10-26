// src/lib/auth.js
import { createAuthClient } from 'better-auth/react'

/**
 * Better Auth client configuration for React.
 * Uses relative path to leverage Vercel rewrites pointing to Render.
 */
export const authClient = createAuthClient({
    baseURL: '', // Al estar vacío, usa el dominio actual y el vercel.json redirige /api/... a Render
})

// Export helper hooks and auth functions
export const { useSession, signIn, signUp, signOut } = authClient