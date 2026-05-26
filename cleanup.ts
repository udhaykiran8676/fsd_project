import { prisma } from "./src/lib/prisma";

async function removeDuplicates() {
  try {
    // Get all colleges
    const colleges = await prisma.college.findMany();
    
    // Group by name
    const grouped: { [key: string]: any[] } = {};
    colleges.forEach((college) => {
      if (!grouped[college.name]) {
        grouped[college.name] = [];
      }
      grouped[college.name].push(college);
    });

    // Delete duplicates
    for (const name in grouped) {
      if (grouped[name].length > 1) {
        console.log(`Found ${grouped[name].length} duplicates of "${name}". Keeping first, deleting rest.`);
        const toDelete = grouped[name].slice(1);
        for (const college of toDelete) {
          await prisma.college.delete({
            where: { id: college.id },
          });
          console.log(`Deleted duplicate: ${college.id}`);
        }
      }
    }

    console.log("Duplicates removed!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicates();
