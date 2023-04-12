import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());



app.listen(3000, () => console.log('Running on: http://localhost:3000'));
