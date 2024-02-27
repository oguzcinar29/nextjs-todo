"use client";
import React, { useContext, useState } from "react";
import SelectProjectType from "@/components/AddTicketPage/SelectProjectType";
import Priorty from "./Priorty";
import Progress from "./Progress";
import Status from "./Status";
import { TicketContext, ticketContextType } from "@/context/TicketContext";
import { useRouter } from "next/navigation";
import { apiURL } from "@/url";
export default function AddTicket() {
  const [title, setTitle] = useState<string>("");
  const [descr, setDescr] = useState<string>("");
  const router = useRouter();
  const { pri, progress, category, projectType } =
    useContext<ticketContextType>(TicketContext);

  const currentUser =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user") || "{}");

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/api/ticket`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          description: descr,
          category: projectType,
          priority: pri,
          progress: progress,
          status: category,
          userId: currentUser,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-white pt-3">
      <form
        onSubmit={handleSubmit}
        className="flex justify-startx flex-col w-1/2 m-auto gap-10  "
      >
        <h2 className="text-2xl font-extrabold">Create Your Ticket</h2>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Title</label>
          <input
            className="bg-slate-400 rounded-sm pl-2 font-light pt-1 pb-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Description</label>
          <textarea
            className="bg-slate-400 rounded-sm p-2 pt-1 pb-1  h-32  font-light resize-none break-words"
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          />
        </div>
        <SelectProjectType />
        <Priorty />
        <Progress />
        <Status />
        <button className="bg-blue-600 pt-3 pb-3 rounded-sm" type="submit">
          CREATE TICKET
        </button>
      </form>
    </div>
  );
}
