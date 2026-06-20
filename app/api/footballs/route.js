import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("orginalDB");

    const footballs = await db
      .collection("footballs")
      .find({})
      .toArray();

    return NextResponse.json(footballs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch football boots" },
      { status: 500 }
    );
  }
}