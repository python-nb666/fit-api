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

export const syncRecords = async (req: Request, res: Response) => {
  try {
    const { records } = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({ error: "Records must be an array" });
    }

    const recordsData = records.map((record: any) => {
      const { userId, exerciseId, reps, weight, weightUnit, sets, date, time } =
        record;
      // 组合日期和时间
      const workoutTime = new Date(`${date}T${time}`);

      return {
        userId: Number(userId),
        exerciseId: Number(exerciseId),
        reps: Number(reps),
        weight: Number(weight),
        weightUnit: weightUnit || "kg",
        sets: Number(sets),
        workoutTime,
      };
    });

    const result = await prisma.workoutRecord.createMany({
      data: recordsData,
    });

    res.json({ message: "Successfully synced records", count: result.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sync records" });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reps, weight, weightUnit, sets, date, time } = req.body;

    const updateData: any = {};
    if (reps !== undefined) updateData.reps = Number(reps);
    if (weight !== undefined) updateData.weight = Number(weight);
    if (weightUnit !== undefined) updateData.weightUnit = weightUnit;
    if (sets !== undefined) updateData.sets = Number(sets);

    if (date && time) {
      updateData.workoutTime = new Date(`${date}T${time}`);
    }

    const record = await prisma.workoutRecord.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update workout record" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.workoutRecord.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete workout record" });
  }
};
