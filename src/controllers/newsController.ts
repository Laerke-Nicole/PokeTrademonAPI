import { Request, Response } from 'express';
import { newsModel } from '../models/NewsModel';
import connectDB from '../config/db';

/**
 * @param req 
 * @param res 
 */
// create news in the data source based on the request body
export async function createNews(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectDB();
        const news = new newsModel(data);
        const result = await news.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating news. Error: " + error);
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all news
export async function getAllNews(req: Request, res: Response) {
    try {
        await connectDB();
        const result = await newsModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting news. Error: " + error);
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve news by id
export async function getNewsByID(req: Request, res: Response) {
    try {
        await connectDB();

        const id = req.params.id;
        const result = await newsModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting news by id. Error: " + error);
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve news by id
export async function updateNewsByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectDB();

        const result = await newsModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("News cant be found with id: " + id);
        }
        else {
            res.status(200).send("News was updated successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error updating news by id. Error: " + error);
    }
}



/**
 * @param req 
 * @param res 
 */
// delete news by id
export async function deleteNewsByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectDB();

        const result = await newsModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Cant delete news with id=: " + id);
        }
        else {
            res.status(200).send("News was deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error deleting news by id. Error: " + error);
    }
}