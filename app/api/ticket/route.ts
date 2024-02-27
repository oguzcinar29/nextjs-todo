import connectMongoDB from "@/libs/mongodb";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description, category, priority, progress, status, userId } =
    await request.json();
  console.log(userId);

  await connectMongoDB();
  await Ticket.create({
    title,
    description,
    category,
    priority,
    progress,
    status,
    userId,
  });
  return NextResponse.json({ message: "Ticket created" }, { status: 201 });
}

export async function GET(request: Request) {
  await connectMongoDB();
  const data = await Ticket.find();

  return NextResponse.json({ data }, { status: 200 });
}
