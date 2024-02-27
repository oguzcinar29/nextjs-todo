import connectMongoDB from "@/libs/mongodb";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  await connectMongoDB();
  await Ticket.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Ticket deleted" });
}
