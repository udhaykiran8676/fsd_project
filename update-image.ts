import { prisma } from "./src/lib/prisma";

async function fixImage() {
  try {
    // Update IIT Delhi with a working image
    await prisma.college.updateMany({
      where: { name: "IIT Delhi" },
      data: {
        image: "https://images.unsplash.com/photo-1506606401543-2e73709cebb4",
      },
    });
    console.log("IIT Delhi image updated!");
    
    // Show all images
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

fixImage();
