import { Router } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new workout record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - exerciseId
 *               - reps
 *               - weight
 *               - sets
 *               - date
 *               - time
 *             properties:
 *               userId:
 *                 type: integer
 *               exerciseId:
 *                 type: integer
 *               reps:
 *                 type: integer
 *               weight:
 *                 type: number
 *               weightUnit:
 *                 type: string
 *               sets:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *               time:
 *                 type: string
 *                 format: time
 *                 example: "10:30:00"
 *     responses:
 *       200:
 *         description: The created workout record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutRecord'
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const { userId, exerciseId, reps, weight, weightUnit, sets, date, time } =
      req.body;

    // 组合日期和时间
    // 假设 date 是 "YYYY-MM-DD", time 是 "HH:mm:ss"
    const workoutTime = new Date(`${date}T${time}`);

    const record = await prisma.workoutRecord.create({
      data: {
        userId: Number(userId), // 确保是数字
        exerciseId: Number(exerciseId),
        reps: Number(reps),
        weight: Number(weight),
        weightUnit: weightUnit || "kg",
        sets: Number(sets),
        workoutTime: workoutTime,
      },
    });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create workout record" });
  }
});

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get workout records
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter records by user ID
 *     responses:
 *       200:
 *         description: List of workout records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutRecord'
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const where = userId ? { userId: Number(userId) } : {};

    const records = await prisma.workoutRecord.findMany({
      where,
      include: {
        exercise: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        workoutTime: "desc",
      },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch workout records" });
  }
});

export default router;
