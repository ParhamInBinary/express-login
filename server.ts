import cookieSession from 'cookie-session';
import express from 'express';
import fs from 'fs';

// SERVER APPLICATION
const app = express();

// DATABASE
interface User  {
    email: string;
    password: string;
}

const users: User[] = []

// GLOBAL MIDDLEWARES
// 1. json
// 2. cookie-session
app.use(express.json());
app.use(cookieSession({
    name: 'login',
    secure: false,
    httpOnly: true,
    secret: 'jqgi326kdf76fs8d9f6s9fsafs135ts',
    maxAge: 1000 * 20,
}));

app.get('/', (req, res) => {
    res.status(200).json("Welcome to my API, please login!")
});

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users/register', (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };
    users.push(user);

    res.status(201).json(user)
})

// START THE SERVER
app.listen(3000, () => console.log('Running on: http://localhost:3000'));
