import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleRegister = async () => {
        const res = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                birth_date: birthDate
            })
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error)
        } else {
            navigate('/login', { state: { message: 'Thanks for signing up! Please log in' } })
        }
    }

    return (
        <div>
            <h1>Register</h1>
            {error && <p>{error}</p>}
            <input placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
            <input placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <input type='date' placeholder='Date of Birth' onChange={e => setBirthDate(e.target.value)} />
            <button type='button' onClick={handleRegister}>Finish Sign Up!</button>
        </div>
    )
}

export default Register