import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Classes() {

    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/classes')
            .then(res => res.json())
            .then(classData => setClasses(classData))
    }, [])

    return (
        <div>
            <h1> Classes </h1>
            <div className='results'>
                {classes.map(c => (
                    <div key={c.class_id} className='card'>
                        <p> Class Id:  {c.class_id}</p>
                        <p> Name: {c.class_name}</p>
                        <p> Description: {c.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

//class_id, class_name, description


export default Classes