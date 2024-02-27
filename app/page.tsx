"use client";
import ShowTicket from "@/components/ShowTickets/ShowTicket";
import { apiURL } from "@/url";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);
  const getAllTickets = async () => {
    try {
      const res = await fetch(`${apiURL}/api/ticket`);
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
