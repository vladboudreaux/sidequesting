import express from 'express'
import cors from 'cors'
import knex from 'knex'

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

const app = express()
app.use(cors())
app.use(express.json())

app.get('/db_health', async (req, res) => {
    try {
        await db.raw('SELECT 1')
        res.json({ status: 'ok' })
    } catch (err) {
        res.status(500).json({ error: 'DB connection failed', details: err.message })
    }
})

app.listen(3001, () => console.log('server running on port 3001'))