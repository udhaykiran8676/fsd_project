import { prisma } from "./src/lib/prisma";

async function fixImage() {
  try {
    await prisma.college.updateMany({
      where: { name: "IIT Delhi" },
      data: {
        image: "https://images.unsplash.com/photo-1599092141434-4fe2a39a43e8",
      },
    });
    console.log("IIT Delhi image updated!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImage();
