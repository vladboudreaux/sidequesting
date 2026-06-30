import express from 'express'
import cors from 'cors'
import knex from 'knex'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

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

const authenticate = (req, res, next) => {
    console.log('authenticate called:', req.cookies)
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: 'Not logged in!' })

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret')
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ error: 'Bad Token!' })
    }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await db('users').where({ email }).first()

    if (!user) return res.status(401).json({ error: 'User not found!' })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) return res.status(401).json({ error: 'Incorrect password!' })

    const token = jwt.sign(
        { user_id: user.user_id, is_admin: user.is_admin },
        'your_jwt_secret',
        { expiresIn: '24h' }
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    })

    res.json({ message: 'Log in successful!' })
})

app.get('/me', authenticate, async (req, res) => {
    const user = await db('users').where({ user_id: req.user.user_id }).first()
    res.json({ user_id: user.user_id, is_admin: user.is_admin, first_name: user.first_name })
})

app.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Logged out!' })
})

app.get('/db_status', async (req, res) => {
    try {
        await db.raw('SELECT 1')
        res.json({ status: 'ok' })
    } catch (err) {
        res.status(500).json({ error: 'DB connection failed', details: err.message })
    }
})

app.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, birth_date } = req.body

    const existing = await db('users').where({ email }).first()
    if (existing) return res.status(400).json({ error: `You've already got an account!` })

    const hashedPassword = await bcrypt.hash(password, 10)

    const [user] = await db('users').insert({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        birth_date,
        is_admin: false
    }).returning('*')

    res.json({ message: 'Thanks for signing up! Log in with your email' })
})

app.get('/users', async (req, res) => {
    const users = await db('users').select('*')
    res.json(users)
})

app.get('/characters', authenticate, async (req, res) => {
    const characters = await db('characters')
        .join('users', 'characters.user_id', 'users.user_id')
        .join('classes', 'characters.class_id', 'classes.class_id')
        .where('characters.user_id', req.user.user_id)
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

app.get('/classes', async (req, res) => {
    const classes = await db('classes').select('*')
    res.json(classes)
})

app.post('/characters', authenticate, async (req, res) => {
    const { class_id, character_name, health, defense,
        strength, intelligence, agility, skill_points } = req.body

    const [character] = await db('characters').insert({
        user_id: req.user.user_id,
        class_id,
        character_name,
        health,
        defense,
        strength,
        intelligence,
        agility,
        skill_points
    }).returning('*')

    res.json({ message: 'Character created!', character })
})

app.delete('/characters/:id', authenticate, async (req, res) => {
    await db('characters').where({ character_id: req.params.id, user_id: req.user.user_id }).del()
    res.json({ message: 'Character deleted!' })
})

app.put('/characters/:id', authenticate, async (req, res) => {
    const { class_id, character_name, health, defense, strength, intelligence, agility, skill_points } = req.body

    const [character] = await db('characters')
        .where({ character_id: req.params.id, user_id: req.user.user_id })
        .update({ class_id, character_name, health, defense, strength, intelligence, agility, skill_points })
        .returning('*')

    res.json({ message: 'Character updated!', character })
})


app.listen(3001, () => console.log('server running on port 3001'))