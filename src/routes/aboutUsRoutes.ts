import express from "express";
import { createAboutUs, getAboutUsByID, getAllAboutUs, updateAboutUsByID, deleteAboutUsByID } from "../controllers/aboutUsController";
import { securityToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AboutUs
 *   description: Manage AboutUs
 */


// create AboutUs
/**
 * @swagger
 * /aboutUs:
 *   post:
 *     summary: Create a new AboutUs entry
 *     tags: [AboutUs]
 *     security:
 *       - auth-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - aboutUsTitle
 *               - aboutUsText
 *             properties:
 *               userId:
 *                 type: string
 *               aboutUsTitle:
 *                 type: string
 *               aboutUsText:
 *                 type: string
 *               mission:
 *                 type: string
 *               vision:
 *                 type: string
 *               valuesSubTitle:
 *                 type: string
 *               valueOneTitle:
 *                 type: string
 *               valueOne:
 *                 type: string
 *               valueTwoTitle:
 *                 type: string
 *               valueTwo:
 *                 type: string
 *               valueThreeTitle:
 *                 type: string
 *               valueThree:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               openingHours:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: About us successfully added
 *       500:
 *         description: Internal server error
 */
router.post("/", securityToken, createAboutUs); 


// get AboutUs by ID
/**
 * @swagger
 * /aboutUs/{id}:
 *   get:
 *     summary: Get a single about us item by ID
 *     tags: [AboutUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the AboutUs item
 *     responses:
 *       200:
 *         description: A single AboutUs item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 aboutUsTitle:
 *                   type: string
 *                 aboutUsText:
 *                   type: string
 *                 mission:
 *                   type: string
 *                 vision:
 *                   type: string
 *                 valuesSubTitle:
 *                   type: string
 *                 valueOneTitle:
 *                   type: string
 *                 valueOne:
 *                   type: string
 *                 valueTwoTitle:
 *                   type: string
 *                 valueTwo:
 *                   type: string
 *                 valueThreeTitle:
 *                   type: string
 *                 valueThree:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *                 openingHours:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: AboutUs not found
 *       500:
 *         description: Error fetching AboutUs item
 */
router.get('/:id', getAboutUsByID);


// get all AboutUs
/**
 * @swagger
 * /aboutUs:
 *   get:
 *     summary: Get all AboutUs
 *     tags: [AboutUs]
 *     responses:
 *       200:
 *         description: All AboutUs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collection:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       aboutUsTitle:
 *                         type: string
 *                       aboutUsText:
 *                         type: string
 *                       mission:
 *                         type: string
 *                       vision:
 *                         type: string
 *                       valuesSubTitle:
 *                         type: string
 *                       valueOneTitle:
 *                         type: string
 *                       valueOne:
 *                         type: string
 *                       valueTwoTitle:
 *                         type: string
 *                       valueTwo:
 *                         type: string
 *                       valueThreeTitle:
 *                         type: string
 *                       valueThree:
 *                         type: string
 *                       imageURL:
 *                         type: string
 *                       openingHours:    
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       email:
 *                         type: string
 *                       userId:
 *                         type: string
 *       404:
 *         description: AboutUs not found
 *       500:
 *         description: Error fetching collection
 */
router.get("/", getAllAboutUs);


// update AboutUs by ID
/**
 * @swagger
 * /aboutUs/{id}:
 *   put:
 *     summary: Update an AboutUs entry
 *     tags: [AboutUs]
 *     security:
 *       - auth-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the AboutUs entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aboutUsTitle
 *               - aboutUsText
 *               - mission
 *               - vision
 *               - valuesSubTitle
 *               - valueOneTitle
 *               - valueOne
 *               - valueTwoTitle
 *               - valueTwo
 *               - valueThreeTitle
 *               - valueThree
 *               - imageURL
 *               - openingHours
 *               - phoneNumber
 *               - email
 *               - userId
 *             properties:
 *               aboutUsTitle:
 *                 type: string
 *               aboutUsText:
 *                 type: string
 *               mission:
 *                 type: string
 *               vision:
 *                 type: string
 *               valuesSubTitle:
 *                 type: string
 *               valueOneTitle:
 *                 type: string
 *               valueOne:
 *                 type: string
 *               valueTwoTitle:
 *                 type: string
 *               valueTwo:
 *                 type: string
 *               valueThreeTitle:
 *                 type: string
 *               valueThree:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               openingHours:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: AboutUs updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AboutUs updated"
 *       404:
 *         description: User or AboutUs not found
 *       500:
 *         description: Server error
 */
router.put('/:id', securityToken, updateAboutUsByID);


// delete AboutUs by ID
/**
 * @swagger
 * /aboutUs/{id}:
 *   delete:
 *     summary: Remove a AboutUs
 *     tags: [AboutUs]
 *     security:
 *       - auth-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the AboutUs to remove
 *     responses:
 *       200:
 *         description: AboutUs successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AboutUs removed"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', securityToken, deleteAboutUsByID);


export default router;