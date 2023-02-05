import { Request, Response, Router } from "express";

const videoRouter = Router();

let videosList: Array<Video> = [{ id: 1, title: 'Крепкий орешек', author: 'Джон Мактирнан', canBeDownloaded: true, minAgeRestriction: 18 },
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

videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videosList)
});

videoRouter.post('/', (req: Request, res: Response) => {
    // let newVideoUnit = req.body;
    if(!req.body.title||!req.body.author){
        res.status(400).send({
            "error messages" : [
                {
                    "message": "No title or author",
                    "field": "title or author"
                }
            ]
        })
    } else {
        let newVideoUnit = {
            ...req.body, publicationDate: new Date().toISOString()
        }
        videosList = [...videosList, newVideoUnit];
        res.status(201).send(newVideoUnit)
    }
});

videoRouter.get('/:id', (req: Request, res: Response) => {
    if(videosList.find(i => i.id === +req.params.id)){
        if(!req.body.title||!req.body.author){
            res.status(400).send({
                "error messages" : [
                    {
                        "message": "No title or author",
                        "field": "title or author"
                    }
                ]
            })
        } else {
            let videoUnit = videosList.find(i => i.id === +req.params.id)
            res.status(200).send(videoUnit)
        }
    }else{
        res.send(404)
    }
});

videoRouter.put('/:id', (req: Request, res: Response) => {
    let updateUnit = videosList.find(i => i.id === +req.params.id)
    if(updateUnit){
        if(!req.body.title||!req.body.author){
            res.status(400).send({
                "error messages" : [
                    {
                        "message": "No title or author",
                        "field": "title or author"
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

videoRouter.delete('/:id', (req: Request, res: Response) => {
    if(req.params.id === 'all-data'){
        videosList = []
        res.send(204)
    }else{
        let deleteUnit = videosList.find(i => i.id === +req.params.id)
        if(deleteUnit){
            videosList.splice(videosList.indexOf(deleteUnit), 1)
            res.status(204).send(deleteUnit)
        }else{
            res.send(404)
        }
    }

});

export default videoRouter;
