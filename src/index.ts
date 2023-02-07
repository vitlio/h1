import express, { Request, Response } from "express";
import bodyParser from "body-parser"
// import videoRouter from "../routes/api.router"; 

// const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

// const parcerMiddleware = bodyParser({})
// app.use(parcerMiddleware)

app.use(express.json())

// app.use('/videos', videoRouter)
// app.use('/testing/all-data', videoRouter)
export let videosList: Array<Video> = [{ id: 1, title: 'Крепкий орешек', author: 'Джон Мактирнан', canBeDownloaded: true, minAgeRestriction: 18 },
                { id: 2, title: 'Джентльмены', author: 'Тарантино', canBeDownloaded: true, minAgeRestriction: 18 },
                { id: 3, title: 'Avatar', author: 'Vfhnby', canBeDownloaded: true, minAgeRestriction: 6 }
];

type Video = {
    id?: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number|null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: Array<string>

}

app.get('/videos', (req: Request, res: Response) => {
    res.send(videosList)
});

app.post('/videos', (req: Request, res: Response) => {
    // let newVideoUnit = req.body;
    if(!req.body.title||typeof req.body.title !== "string"){
        res.status(400).send({
            "error messages" : [
                {
                    "message": "No title or author",
                    "field": "title"
                }
            ]
        })
    }else if(!req.body.author||typeof req.body.author !== "string"){
        res.status(400).send({
            "error messages" : [
                {
                    "message": "No title or author",
                    "field": "author"
                }
            ]
        })
    } else {
        let newVideoUnit: Video = {
            id: Number(new Date()),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            availableResolutions: req.body.availableResolutions
        }
        videosList = [...videosList, newVideoUnit];
        res.status(201).send(newVideoUnit)
    }
});

app.get('/videos/:id', (req: Request, res: Response) => {

    let videoUnit = videosList.find(i => i.id === +req.params.id)

    if(videoUnit){
        res.status(200).send(videoUnit)
    }else{
        res.send(404)
    }
});

app.put('/videos/:id', (req: Request, res: Response) => {
    let updateUnit = videosList.find(i => i.id === +req.params.id)
    if(updateUnit){
        if(!req.body.title||typeof req.body.title !== "string"){
            res.status(400).send({
                "error messages" : [
                    {
                        "message": "No title or author",
                        "field": "title"
                    }
                ]
            })
        }else if(!req.body.author||typeof req.body.author !== "string"){
            res.status(400).send({
                "error messages" : [
                    {
                        "message": "No title or author",
                        "field": "author"
                    }
                ]
            })
        } else {
            videosList[videosList.indexOf(updateUnit)] = {...videosList[videosList.indexOf(updateUnit)], ...req.body}
            res.status(204).send(videosList[videosList.indexOf(updateUnit)])
        }
    }else{
        res.send(404)
    }
});

app.delete('/videos/:id', (req: Request, res: Response) => {
        let deleteUnit = videosList.find(i => i.id === +req.params.id)
        if(deleteUnit){
            videosList.splice(videosList.indexOf(deleteUnit), 1)
            res.status(204).send(deleteUnit)
        }else{
            res.status(404).send("Not Found")
        }
});

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videosList = []
    res.send(204)
    return
});

app.listen(PORT, () => console.log('Server started ...'));
