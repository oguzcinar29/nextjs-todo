import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  await connectMongoDB();
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await User.find({ email });

    console.log(existingUser);

    if (existingUser.length !== 0) {
      return NextResponse.json(
        { message: "User already exist! Try to login" },
        { status: 409 }
      );
    }
    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Email has to have @ inside." },
        { status: 422 }
      );
    }
    if (!email.includes(".com")) {
      return NextResponse.json(
        { message: "Email has to have .com" },
        { status: 422 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password has to be greater than 6 letter." },
        { status: 422 }
      );
    }

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User created." }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create user - Internal server error" },
      { status: 500 }
    );
  }
}
