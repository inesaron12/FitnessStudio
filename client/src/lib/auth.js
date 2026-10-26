import { createAuthClient } from 'better-auth/react'

/**
 * Better Auth client configuration for React.
 * Connected directly to Render backend to ensure cookie and session stability.
 */
export const authClient = createAuthClient({
    baseURL: 'https://pulsestudio.onrender.com', // Apuntamos directamente al backend en Render
    fetchOptions: {
        credentials: 'include', // Imprescindible para que el navegador acepte y envíe las cookies de sesión
    },
})

// Export helper hooks and auth functions
export const { useSession, signIn, signUp, signOut } = authClient