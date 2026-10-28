import { createAuthClient } from 'better-auth/react'

/**
 * Better Auth client configuration for React.
 * Connected directly to Render backend to ensure cookie and session stability.
 */
export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Apunta al backend local o producción según el entorno
    fetchOptions: {
        credentials: 'include', // Imprescindible para que el navegador acepte y envíe las cookies de sesión
    },
})

// Export helper hooks and auth functions
export const { useSession, signIn, signUp, signOut } = authClient