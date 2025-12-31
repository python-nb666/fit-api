import { Router } from "express";
import { getCategories } from "../controllers/exercisesController";

const router = Router();

/**
 * @swagger
 * /api/exercises/categories:
 *   get:
 *     summary: Get all categories with their exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: List of categories with exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get("/categories", getCategories);

export default router;
