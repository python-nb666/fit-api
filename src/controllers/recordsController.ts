import { Request, Response } from "express";
import prisma from "../prisma";

export const createRecord = async (req: Request, res: Response) => {
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
};

export const getRecords = async (req: Request, res: Response) => {
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
};
