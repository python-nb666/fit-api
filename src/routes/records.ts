import { Router } from "express";
import {
  createRecord,
  getRecords,
  syncRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/recordsController";

const router = Router();

/**
 * @swagger
 * /api/records/batch:
 *   post:
 *     summary: Batch create workout records (Sync)
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - records
 *             properties:
 *               records:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - userId
 *                     - exerciseId
 *                     - reps
 *                     - weight
 *                     - sets
 *                     - date
 *                     - time
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     exerciseId:
 *                       type: integer
 *                     reps:
 *                       type: integer
 *                     weight:
 *                       type: number
 *                     weightUnit:
 *                       type: string
 *                     sets:
 *                       type: integer
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-12-31"
 *                     time:
 *                       type: string
 *                       format: time
 *                       example: "10:30:00"
 *     responses:
 *       200:
 *         description: Sync successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.post("/batch", syncRecords);

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
router.post("/", createRecord);

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
router.get("/", getRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a workout record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated record
 *       500:
 *         description: Server error
 */
router.put("/:id", updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a workout record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteRecord);

export default router;
