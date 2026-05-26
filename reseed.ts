import { prisma } from "./src/lib/prisma";

async function reseed() {
  try {
    // Delete all colleges
    await prisma.college.deleteMany({});
    console.log("Deleted all colleges");

    // Create new colleges with unique images
    await prisma.college.createMany({
      data: [
        {
          name: "IIT Delhi",
          location: "Delhi",
          fees: 200000,
          rating: 4.8,
          description: "Top engineering college",
          placements: "95%",
          image: "https://images.unsplash.com/photo-1560439773-aa886340c56e",
        },
        {
          name: "BITS Pilani",
          location: "Rajasthan",
          fees: 350000,
          rating: 4.7,
          description: "Private engineering college",
          placements: "93%",
          image: "https://images.unsplash.com/photo-1562774053-701939374585",
        },
        {
          name: "NIT Trichy",
          location: "Tamil Nadu",
          fees: 180000,
          rating: 4.6,
          description: "Top NIT college",
          placements: "92%",
          image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        },
      ],
    });

    console.log("Database Reseeded with unique images!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

reseed();
