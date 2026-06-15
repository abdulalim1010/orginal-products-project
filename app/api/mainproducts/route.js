
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("orginalDB");

    const products = await db
      .collection("mainproducts")
      .find({})
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}