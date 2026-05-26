import { prisma } from "./src/lib/prisma";

async function updateIITDelhiImage() {
  try {
    // Update IIT Delhi with a reliable Unsplash campus image
    await prisma.college.updateMany({
      where: { name: "IIT Delhi" },
      data: {
        image: "https://images.unsplash.com/photo-1564865400656-f1f6d2b6eed6?w=1000",
      },
    });
    console.log("IIT Delhi image updated!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateIITDelhiImage();
