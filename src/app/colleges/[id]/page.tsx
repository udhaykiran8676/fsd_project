async function getCollege(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/colleges/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch college");
  }

  return res.json();
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      <h1 className="text-5xl font-bold mt-6">
        {college.name}
      </h1>

      <p className="text-zinc-400 text-xl mt-2">
        {college.location}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="border border-zinc-700 p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Fees</h2>
          <p className="text-zinc-300 mt-2">
            ₹{college.fees}
          </p>
        </div>

        <div className="border border-zinc-700 p-6 rounded-xl">
          <h2 className="text-2xl font-bold">Rating</h2>
          <p className="text-yellow-400 mt-2">
            ⭐ {college.rating}
          </p>
        </div>

        <div className="border border-zinc-700 p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            Placements
          </h2>
          <p className="text-zinc-300 mt-2">
            {college.placements}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">
          About
        </h2>

        <p className="text-zinc-300 leading-8">
          {college.description}
        </p>
      </div>
    </div>
  );
}