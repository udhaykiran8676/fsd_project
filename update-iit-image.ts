import { prisma } from "./src/lib/prisma";

async function updateIITDelhiImage() {
  try {
    // Update IIT Delhi with an actual IIT Delhi campus image
    await prisma.college.updateMany({
      where: { name: "IIT Delhi" },
      data: {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/IIT_Delhi_Main_Building.jpg/1200px-IIT_Delhi_Main_Building.jpg",
      },
    });
    console.log("IIT Delhi image updated with actual campus photo!");
    
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

updateIITDelhiImage();
