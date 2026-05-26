import { prisma } from "./src/lib/prisma";

async function checkImages() {
  try {
    const colleges = await prisma.college.findMany({
      select: { name: true, image: true },
    });
    console.log("Current college images:");
    colleges.forEach((c) => {
      console.log(`${c.name}: ${c.image}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkImages();
