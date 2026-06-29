import express from 'express'
import cors from 'cors'
import knex from 'knex'

const app = express()
app.use(cors())
app.use(express.json())

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'docker',
        database: 'sidequest'
    }
})


app.get('/db_health', async (req, res) => {
    try {
        await db.raw('SELECT 1')
        res.json({ status: 'ok' })
    } catch (err) {
        res.status(500).json({ error: 'DB connection failed', details: err.message })
    }
})

app.get('/users', async (req, res) => {
    const users = await db('users').select('*')
    res.json(users)
})

app.get('/characters', async (req, res) => {
    const characters = await db('characters')
        .join('users', 'characters.user_id', 'users.user_id')
        .join('classes', 'characters.class_id', 'classes.class_id')
        .select('characters.*', 'users.email', 'classes.class_name')
    res.json(characters)
})

app.get('/enemies', async (req, res) => {
    const enemies = await db('enemies')
        .join('classes', 'enemies.class_id', 'classes.class_id')
        .select('enemies.*', 'classes.class_name')
    res.json(enemies)
})

app.get('/abilities', async (req, res) => {
    const abilities = await db('abilities').select('*')
    res.json(abilities)
})
app.get('/equipment', async (req, res) => {
    const equipment = await db('equipment_list').select('*')
    res.json(equipment)
})


app.listen(3001, () => console.log('server running on port 3001'))