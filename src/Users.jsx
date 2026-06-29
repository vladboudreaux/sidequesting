import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(userData => setUsers(userData))
    }, [])

    return (
        <div>
            <h1> Users </h1>
            <div className='results'>
                {users.filter(user => !user.is_admin).map(user => (
                    <div key={user.user_id} className='card'>
                        <p> User ID: {user.user_id}</p>
                        <p> Full Name: {user.first_name} {user.last_name}</p>
                        <p> email: {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users