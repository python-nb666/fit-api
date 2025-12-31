import { Router } from "express";
import prisma from "../prisma";

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
router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        exercises: true,
      },
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;
