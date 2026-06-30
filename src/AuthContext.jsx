import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/me', { credentials: 'include' })
            .then(res => res.ok ? res.json() : null)
            .then(data => setUser(data))
    }, [])

    const logout = async () => {
        await fetch('http://localhost:3001/logout', { method: 'POST', credentials: 'include' })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)