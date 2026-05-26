import { prisma } from "./src/lib/prisma";

async function updateAllImages() {
  try {
    // Update all colleges with reliable placeholder images
    await prisma.college.updateMany({
      where: { name: "IIT Delhi" },
      data: {
        image: "https://via.placeholder.com/500x300?text=IIT+Delhi+Campus",
      },
    });

    await prisma.college.updateMany({
      where: { name: "BITS Pilani" },
      data: {
        image: "https://via.placeholder.com/500x300?text=BITS+Pilani+Campus",
      },
    });

    await prisma.college.updateMany({
      where: { name: "NIT Trichy" },
      data: {
        image: "https://via.placeholder.com/500x300?text=NIT+Trichy+Campus",
      },
    });

    console.log("All images updated with placeholder!");
    
    const colleges = await prisma.college.findMany({
      select: { name: true, image: true },
    });
    console.log("\nUpdated colleges:");
    colleges.forEach((c) => {
      console.log(`${c.name}: ${c.image}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllImages();
