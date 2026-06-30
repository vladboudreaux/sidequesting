import { useState, useEffect, useContext } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import PageHeader from './PageHeader'
import HomePage from './HomePage'
import Users from './Users'
import Characters from './Characters'
import Enemies from './Enemies'
import Equipment from './Equipment'
import Abilities from './Abilities'
import Login from './Login'
import Register from './Register'
import Classes from './Classes'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageHeader />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'characters',
        element: <Characters />
      },
      {
        path: 'enemies',
        element: <Enemies />
      },
      {
        path: 'equipment',
        element: <Equipment />
      },
      {
        path: 'abilities',
        element: <Abilities />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'classes',
        element: <Classes />
      }
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
