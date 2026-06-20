import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("orginalDB");

    const jerseys = await db
      .collection("jerseys")
      .find({})
      .toArray();

    return NextResponse.json(jerseys);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jerseys" },
      { status: 500 }
    );
  }
}