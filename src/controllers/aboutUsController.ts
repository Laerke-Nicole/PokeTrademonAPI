import { Request, Response } from 'express';
import { aboutUsModel } from '../models/AboutUsModel';
import connectDB from '../config/db';

/**
 * @param req 
 * @param res 
 */
// create about us in the data source based on the request body
export async function createAboutUs(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectDB();
        const aboutUs = new aboutUsModel(data);
        const result = await aboutUs.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating about us. Error: " + error);
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all about us
export async function getAllAboutUs(req: Request, res: Response) {
    try {
        await connectDB();
        const result = await aboutUsModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting about us. Error: " + error);
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve about us by id
export async function getAboutUsByID(req: Request, res: Response) {
    try {
        await connectDB();

        const id = req.params.id;
        const result = await aboutUsModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting about us by id. Error: " + error);
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve about us by id
export async function updateAboutUsByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectDB();

        const result = await aboutUsModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("About us cant be found with id: " + id);
        }
        else {
            res.status(200).send("About us was updated successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error updating about us by id. Error: " + error);
    }
}



/**
 * @param req 
 * @param res 
 */
// delete about us by id
export async function deleteAboutUsByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectDB();

        const result = await aboutUsModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Cant delete about us with id=: " + id);
        }
        else {
            res.status(200).send("About us was deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error deleting about us by id. Error: " + error);
    }
}