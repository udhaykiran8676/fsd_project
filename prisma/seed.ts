import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 200000,
        rating: 4.8,
        description: "Top engineering college",
        placements: "95%",
        image: "/iitdelhi.jpg",
      },

      {
        name: "BITS Pilani",
        location: "Rajasthan",
        fees: 350000,
        rating: 4.7,
        description: "Private engineering college",
        placements: "93%",
        image: "/bitspilani.jpg",
      },

      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 180000,
        rating: 4.6,
        description: "Top NIT college",
        placements: "92%",
        image: "/nittrichy.jpg",
      },
    ],
  });

  console.log("Database Seeded");
}

main();