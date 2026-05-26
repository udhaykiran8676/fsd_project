"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCompareStore } from "@/store/compare-store";

export default function Home() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minFees, setMinFees] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [minRating, setMinRating] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: session } = useSession();
  const { colleges: compareList, addCollege, removeCollege } = useCompareStore();

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location) params.append("location", location);
    if (minFees) params.append("minFees", minFees);
    if (maxFees) params.append("maxFees", maxFees);
    if (minRating) params.append("minRating", minRating);

    fetch(`/api/colleges?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error("API returned non-array:", data);
          setColleges([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setColleges([]);
      });
  }, [search, location, minFees, maxFees, minRating]);

  useEffect(() => {
    const userId = (session?.user as any)?.id;
    if (userId) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data.map((fav: any) => fav.collegeId));
        });
    }
  }, [session]);

  const toggleFavorite = async (collegeId: string) => {
    const userId = (session?.user as any)?.id;
    if (!userId) {
      alert("Please sign in to save colleges");
      return;
    }

    if (favorites.includes(collegeId)) {
      await fetch("/api/favorites", {
        method: "DELETE",
        body: JSON.stringify({ collegeId }),
      });
      setFavorites(favorites.filter((id) => id !== collegeId));
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ collegeId }),
      });
      setFavorites([...favorites, collegeId]);
    }
  };

  const toggleCompare = (collegeId: string) => {
    if (compareList.includes(collegeId)) {
      removeCollege(collegeId);
    } else {
      addCollege(collegeId);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">College Discovery</h1>
        <div className="flex gap-4">
          {compareList.length > 0 && (
            <Link
              href="/compare"
              className="bg-blue-600 px-4 py-2 rounded-lg font-bold"
            >
              Compare ({compareList.length})
            </Link>
          )}
          {session?.user ? (
            <div className="flex gap-2">
              <span className="px-4 py-2">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 px-4 py-2 rounded-lg font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-green-600 px-4 py-2 rounded-lg font-bold"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-5xl font-bold mb-8">College Discovery Platform</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-700 mb-8 text-black"
        />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 rounded-lg border border-gray-700 text-black"
          />
          <input
            type="number"
            placeholder="Min Fees (₹)"
            value={minFees}
            onChange={(e) => setMinFees(e.target.value)}
            className="p-3 rounded-lg border border-gray-700 text-black"
          />
          <input
            type="number"
            placeholder="Max Fees (₹)"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            className="p-3 rounded-lg border border-gray-700 text-black"
          />
          <input
            type="number"
            placeholder="Min Rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            step="0.1"
            max="5"
            className="p-3 rounded-lg border border-gray-700 text-black"
          />
          {(search || location || minFees || maxFees || minRating) && (
            <button
              onClick={() => {
                setSearch("");
                setLocation("");
                setMinFees("");
                setMaxFees("");
                setMinRating("");
              }}
              className="bg-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-600"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colleges.map((college: any) => (
            <div key={college.id} className="border border-gray-700 rounded-2xl p-4 bg-gray-800 hover:border-gray-500 transition">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-60 object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">{college.name}</h2>

              <p className="text-gray-400 mt-1">{college.location}</p>

              <div className="flex justify-between mt-4 text-sm">
                <span>₹{college.fees.toLocaleString()}</span>
                <span>⭐ {college.rating}</span>
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  href={`/colleges/${college.id}`}
                  className="flex-1 bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                  Details
                </Link>
                <button
                  onClick={() => toggleFavorite(college.id)}
                  className={`py-3 px-4 rounded-xl font-bold ${
                    favorites.includes(college.id)
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  ♥
                </button>
                <button
                  onClick={() => toggleCompare(college.id)}
                  className={`py-3 px-4 rounded-xl font-bold ${
                    compareList.includes(college.id)
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  ⚖
                </button>
              </div>
            </div>
          ))}
        </div>

        {colleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No colleges found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}