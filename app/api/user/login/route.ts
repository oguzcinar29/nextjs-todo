import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectMongoDB();
  try {
    const findEmail = await User.find({ email });

    if (findEmail.length === 0) {
      return NextResponse.json(
        { message: "The email was not found! Try to sign up first." },
        { status: 409 }
      );
    }
    const result = await bcrypt.compare(password, findEmail[0].password);

    if (result) {
      return NextResponse.json({ id: findEmail[0] }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Password is uncorrect" },
        { status: 422 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Website crashed" }, { status: 500 });
  }
}
