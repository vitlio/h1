import express, { Request, Response } from "express";
import videoRouter from "../routes/api.router"; 

// const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json())

app.use('/videos', videoRouter)
app.use('/testing/all-data', videoRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('hello world!');  
});

app.listen(PORT, () => console.log('Server started ...'));
