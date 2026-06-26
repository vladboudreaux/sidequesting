import { useState, useEffect, useContext } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import PageHeader from './PageHeader'
import HomePage from './HomePage'
import Users from './Users'
import Characters from './Characters'
import Enemies from './Enemies'
import Equipment from './Equipment'
import Abilities from './Abilities'
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
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
