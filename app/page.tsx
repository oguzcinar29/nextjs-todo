"use client";
import ShowTicket from "@/components/ShowTickets/ShowTicket";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const apiURL = process.env.API_URI;
  const [data, setData] = useState<any[] | null>(null);
  const getAllTickets = async () => {
    try {
      const res = await fetch(
        `https://nextjs-todo-omega.vercel.app/api/ticket`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch all tickets");
      }
      res.json().then((data) => setData(data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <main className="">
      {data?.length !== 0 ? (
        <div className="flex flex-wrap">
          {data?.map((item: any, i: number) => {
            return <ShowTicket key={i} {...item} />;
          })}
        </div>
      ) : (
        "There is no ticket yet"
      )}
    </main>
  );
}
