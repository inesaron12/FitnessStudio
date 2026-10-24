// src/lib/auth.js
import { createAuthClient } from 'better-auth/react'

/**
 * Better Auth client configuration for React.
 * Uses the proxy path or explicit backend base URL.
 */
export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_AUTH_URL || 'http://localhost:3000',
})

// Export helper hooks and auth functions
export const { useSession, signIn, signUp, signOut } = authClient