import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function PageHeader() {
    return (
        <div className="pageheader">
            <div className="navbar">
                <Link to='/'>
                    <button> Home </button>
                </Link>
                <Link to='users'>
                    <button> Users </button>
                </Link>
                <Link to='characters'>
                    <button> Characters </button>
                </Link>
                <Link to='enemies'>
                    <button> Enemies </button>
                </Link>
                <Link to='equipment'>
                    <button> Equipment </button>
                </Link>
                <Link to='abilities'>
                    <button> Abilities </button>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default PageHeader