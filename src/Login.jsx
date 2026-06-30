import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Login() {
    const { setUser } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const successMessage = location.state?.message

    const handleLogin = async () => {
        const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error)
        } else {
            const me = await fetch('http://localhost:3001/me', { credentials: 'include' })
            const userData = await me.json()
            setUser(userData)
            navigate('/')
        }
    }

    return (
        <div>
            <h1> Login </h1>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button> <br />
            <button onClick={() => navigate('/register')}> Sign Up </button>
        </div>
    )
}

export default Login