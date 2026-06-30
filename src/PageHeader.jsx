import { useAuth } from './AuthContext'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function PageHeader() {

    const { user, logout } = useAuth()

    return (
        <div className="pageheader">
            <div className="navbar">
                {user
                    ? <button onClick={logout}>Log Out</button>
                    : <Link to='/login'>
                        <button> Login</button>
                    </Link>}
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
                <Link to='classes'>
                    <button> Classes </button>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default PageHeader