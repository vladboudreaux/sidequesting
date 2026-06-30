import { useState, useEffect, useContext } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

function HomePage() {

    const { user, logout } = useAuth()
    if (!user) return <p> Please log in.</p>

    return (
        <div>
            <h1> Home </h1>
            {user ? <p> Whaddup, {user.first_name}</p> : <p> Please log in.</p>}
        </div>
    )
}


export default HomePage