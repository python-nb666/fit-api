import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data: Record<string, { name: string; exercises: string[] }> = {
  chest: {
    name: "胸部",
    exercises: ["杠铃卧推", "哑铃卧推", "上斜卧推", "双杠臂屈伸", "绳索夹胸"],
  },
  back: {
    name: "背部",
    exercises: ["引体向上", "杠铃划船", "高位下拉", "坐姿划船", "直臂下压"],
  },
  shoulders: {
    name: "肩部",
    exercises: ["坐姿推举", "哑铃侧平举", "面拉", "前平举", "反向飞鸟"],
  },
  legs: {
    name: "腿部",
    exercises: ["深蹲", "硬拉", "腿举", "哈克深蹲", "腿屈伸"],
  },
  arms: {
    name: "手臂",
    exercises: ["杠铃弯举", "哑铃弯举", "绳索下压", "仰卧臂屈伸"],
  },
  core: {
    name: "核心",
    exercises: ["卷腹", "平板支撑", "悬垂举腿", "俄罗斯转体"],
  },
};

async function main() {
  console.log("Start seeding...");

  for (const [slug, categoryData] of Object.entries(data)) {
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: categoryData.name,
      },
    });

    console.log(`Created category: ${category.name}`);

    for (const exerciseName of categoryData.exercises) {
      await prisma.exercise.create({
        data: {
          name: exerciseName,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
