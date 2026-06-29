import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Abilities() {

    const [abilities, setAbilities] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/abilities')
            .then(res => res.json())
            .then(abilityData => setAbilities(abilityData))
    }, [])

    return (
        <div>
            <h1> Abilities </h1>
            <div className='results'>
                {abilities.map(a => (
                    <div key={a.ability_id} className='card'>
                        <p> Ability ID: {a.ability_id}</p>
                        <p> Ability Name: {a.name}</p>
                        <p> Description: {a.description}</p>
                        <p> Effect: {a.effect}</p>
                        <p> Damage: {a.damage}</p>
                        <p> Cooldown: {a.cooldown}</p>
                        <p> Cost: {a.cost}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Abilities