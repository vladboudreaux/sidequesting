import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Characters() {
    const { user } = useAuth()
    const [characters, setCharacters] = useState([])
    const [classes, setClasses] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState(null)
    const [editingCharacter, setEditingCharacter] = useState(null)

    const [classId, setClassId] = useState('')
    const [characterName, setCharacterName] = useState('')
    const [health, setHealth] = useState('')
    const [defense, setDefense] = useState('')
    const [strength, setStrength] = useState('')
    const [intelligence, setIntelligence] = useState('')
    const [agility, setAgility] = useState('')
    const [skillPoints, setSkillPoints] = useState('')

    const fetchCharacters = () => {
        fetch('http://localhost:3001/characters', { credentials: 'include' })
            .then(res => res.json())
            .then(characterData => setCharacters(characterData))
    }

    useEffect(() => {
        fetchCharacters()
        fetch('http://localhost:3001/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const handleCreate = async () => {
        const res = await fetch('http://localhost:3001/characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                class_id: classId,
                character_name: characterName,
                health,
                defense,
                strength,
                intelligence,
                agility,
                skill_points: skillPoints
            })
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error)
        } else {
            setError(null)
            setShowForm(false)
            fetchCharacters()
        }
    }

    const handleDelete = async (characterId) => {
        const confirmed = window.confirm('Are You sure you want to delete this character?')
        if (!confirmed) return

        await fetch(`http://localhost:3001/characters/${characterId}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        fetchCharacters()
    }

    if (!user) return <p> Please log in</p>

    return (
        <div>
            <h1>Characters</h1>
            <button type='button' onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Character'}
            </button>

            {showForm && (
                <div>
                    {error && <p>{error}</p>}
                    <input placeholder='Character Name' onChange={e => setCharacterName(e.target.value)} />
                    <select onChange={e => setClassId(e.target.value)}>
                        <option value=''> Select a class</option>
                        {classes.map(c => (
                            <option key={c.class_id} value={c.class_id}>{c.class_name}</option>
                        ))}
                    </select>
                    <input placeholder='Health' type='number' onChange={e => setHealth(e.target.value)} />
                    <input placeholder='Defense' type='number' onChange={e => setDefense(e.target.value)} />
                    <input placeholder='Strength' type='number' onChange={e => setStrength(e.target.value)} />
                    <input placeholder='Intelligence' type='number' onChange={e => setIntelligence(e.target.value)} />
                    <input placeholder='Agility' type='number' onChange={e => setAgility(e.target.value)} />
                    <input placeholder='Skill Points' type='number' onChange={e => setSkillPoints(e.target.value)} />
                    <button type='button' onClick={handleCreate}>Create!</button>
                </div>
            )}

            <div className='results'>
                {characters.map(c => (
                    <div key={c.character_id} className='card'>
                        <p>Character ID: {c.character_id}</p>
                        <p>Character Name: {c.character_name}</p>
                        <p>Character Class: {c.class_name}</p>
                        <p>Health: {c.health}</p>
                        <p>Defense: {c.defense}</p>
                        <p>Strength: {c.strength}</p>
                        <p>Intelligence: {c.intelligence}</p>
                        <p>Skill Points: {c.skill_points}</p>
                        <button>Edit Character</button>
                        <button type='button' onClick={() => handleDelete(c.character_id)}> Delete </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters