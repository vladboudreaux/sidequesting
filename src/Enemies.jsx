import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Enemies() {


    const [enemies, setEnemies] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/enemies')
            .then(res => res.json())
            .then(enemyData => setEnemies(enemyData))
    }, [])


    return (
        <div>
            <h1> Enemies </h1>
            <div className='results'>
                {enemies.map(e => (
                    <div key={e.enemy_id} className='card'>
                        <p> Enemy ID: {e.enemy_id}</p>
                        <p> Enemy Name: {e.enemy_name}</p>
                        <p> Class: {e.class_name}</p>
                        <p> Health: {e.health}</p>
                        <p> Defense: {e.defense}</p>
                        <p> Strength: {e.defense}</p>
                        <p> Intelligence: {e.intelligence}</p>
                        <p> Agility: {e.agility}</p>
                        <p> Skill Points: {e.skill_points}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Enemies