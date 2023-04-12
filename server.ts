import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json("Welcome to my API, please login!")
});



app.listen(3000, () => console.log('Running on: http://localhost:3000'));
