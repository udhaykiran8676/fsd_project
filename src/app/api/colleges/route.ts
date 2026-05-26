import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const minFees = searchParams.get("minFees");
    const maxFees = searchParams.get("maxFees");
    const minRating = searchParams.get("minRating");

    const whereConditions: any[] = [];

    if (search) {
      whereConditions.push({
        name: {
          contains: search,
          mode: "insensitive",
        },
      });
    }

    if (location) {
      whereConditions.push({
        location: {
          contains: location,
          mode: "insensitive",
        },
      });
    }

    if (minFees) {
      whereConditions.push({
        fees: {
          gte: parseInt(minFees),
        },
      });
    }

    if (maxFees) {
      whereConditions.push({
        fees: {
          lte: parseInt(maxFees),
        },
      });
    }

    if (minRating) {
      whereConditions.push({
        rating: {
          gte: parseFloat(minRating),
        },
      });
    }

    const colleges = await prisma.college.findMany({
      where:
        whereConditions.length > 0
          ? {
              AND: whereConditions,
            }
          : {},
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("College fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch colleges",
      },
      {
        status: 500,
      }
    );
  }
}