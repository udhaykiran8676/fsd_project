"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompareStore } from "@/store/compare-store";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  description: string;
  placements: string;
  image: string;
}

export default function ComparePage() {
  const { colleges: collegeIds, removeCollege } = useCompareStore();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const collegesData = await Promise.all(
          collegeIds.map((id) =>
            fetch(`/api/colleges/${id}`).then((res) => res.json())
          )
        );
        setColleges(collegesData);
      } catch (error) {
        console.error("Failed to fetch colleges", error);
      } finally {
        setLoading(false);
      }
    };

    if (collegeIds.length > 0) {
      fetchColleges();
    } else {
      setColleges([]);
      setLoading(false);
    }
  }, [collegeIds]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <Link href="/" className="text-blue-400 mb-8 block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Compare Colleges</h1>
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl mb-4">
            No colleges selected for comparison
          </p>
          <Link
            href="/"
            className="bg-blue-600 px-6 py-3 rounded-lg font-bold"
          >
            Add Colleges to Compare
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { label: "Location", key: "location" },
    { label: "Annual Fees", key: "fees" },
    { label: "Rating", key: "rating" },
    { label: "Placement Rate", key: "placements" },
    { label: "Description", key: "description" },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <Link href="/" className="text-blue-400 mb-8 block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">Compare Colleges</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {/* College Images & Names */}
            <tr className="border-b border-gray-700">
              <td className="p-4 font-bold min-w-40 bg-gray-800">Name</td>
              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4 text-center border-l border-gray-700 min-w-64"
                >
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold">{college.name}</h2>
                  <button
                    onClick={() => removeCollege(college.id)}
                    className="mt-2 bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              ))}
            </tr>

            {/* Comparison Features */}
            {features.map((feature) => (
              <tr key={feature.key} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-4 font-bold bg-gray-800 min-w-40">
                  {feature.label}
                </td>
                {colleges.map((college) => (
                  <td
                    key={`${college.id}-${feature.key}`}
                    className="p-4 text-center border-l border-gray-700 min-w-64"
                  >
                    {feature.key === "fees" ? (
                      <span className="text-lg font-semibold">
                        ₹{(college as any)[feature.key].toLocaleString()}
                      </span>
                    ) : feature.key === "rating" ? (
                      <span className="text-lg font-semibold flex items-center justify-center gap-2">
                        ⭐ {(college as any)[feature.key]}
                      </span>
                    ) : (
                      <span>{(college as any)[feature.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Add More Colleges
        </Link>
      </div>
    </div>
  );
}
