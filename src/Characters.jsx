import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

function Characters() {

    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/characters')
            .then(res => res.json())
            .then(characterData => setCharacters(characterData))
    }, [])

    return (
        <div>
            <h1> Characters </h1>
            <div className='results'>
                {characters.map(c => (
                    <div key={c.character_id} className='card'>
                        <p> User: {c.email}</p>
                        <p> Character ID: {c.character_id}</p>
                        <p> Character Name: {c.character_name}</p>
                        <p> Character Class: {c.class_name}</p>
                        <p> Health: {c.health}</p>
                        <p> Defense: {c.defense}</p>
                        <p> Strength: {c.defense}</p>
                        <p> Intelligence: {c.intelligence}</p>
                        <p> Agility: {c.agility}</p>
                        <p> Skill Points: {c.skill_points}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters