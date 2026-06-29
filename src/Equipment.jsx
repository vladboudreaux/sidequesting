import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Equipment() {

    const [equipment, setEquipment] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/equipment')
            .then(res => res.json())
            .then(equipmentData => setEquipment(equipmentData))
    }, [])

    return (
        <div>
            <h1> Equipment </h1>
            <div className='results'>
                {equipment.map(e => (
                    <div key={e.equipment_id} className='card'>
                        <p> Equipment ID: {e.equipment_id}</p>
                        <p> Name: {e.name}</p>
                        <p> Type: {e.equipment_type}</p>
                        <p> Description: {e.description}</p>
                        <p> Effect: {e.effect}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Equipment