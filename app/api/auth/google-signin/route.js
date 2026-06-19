import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: "ID token is required" },
        { status: 400 }
      );
    }

    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const mongoClient = await clientPromise;
    const db = mongoClient.db("orginalDB");

    let user = await db.collection("users").findOne({ email });

    if (!user) {
      const result = await db.collection("users").insertOne({
        name,
        email,
        image: picture,
        provider: "google",
        createdAt: new Date(),
      });
      user = { _id: result.insertedId, name, email, image: picture };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { success: true, message: "Google sign-in successful", token },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}