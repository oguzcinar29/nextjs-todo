"use client";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import ShowPrio from "./ShowPrio";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type PropsItem = {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  _id: string;
  userId: string;
  createdAt: Date;
};

export default function ShowTicket(props: PropsItem) {
  const {
    title,
    description,
    category,
    priority,
    progress,
    status,
    _id,
    createdAt,
    userId,
  } = props;
  const router = useRouter();
  const [deleted, setDeleted] = React.useState<boolean>(false);

  const [user, setUser] = React.useState<any | null>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user"))?._id) ||
      null
  );
  console.log(user);

  const deleteTicket = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/ticket/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete ticket");
      } else {
        console.log("hey");
        setDeleted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (deleted) {
    return null; // If ticket is deleted, return null to effectively remove the component
  }
  return (
    <div className="flex flex-col w-1/3 text-white gap-3 p-3">
      <h1 className="font-bold text-3xl">{category}</h1>
      <div className="flex flex-col gap-3  bg-sky-800 p-3 rounded-md">
        <div className="flex justify-between ">
          <ShowPrio priority={priority} />
          {userId === user && (
            <button onClick={deleteTicket}>
              <CloseIcon className="text-red-300" />
            </button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <hr className="text-black h-1 border-spacing-0 border-t-2  mb-2 mr-0 ml-0 p-0 border-black" />
        </div>
        <p>{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span>{createdAt}</span>
            <Box sx={{ width: 50 }}>
              <Slider
                disabled
                size="small"
                defaultValue={progress}
                aria-label="Small"
                valueLabelDisplay="auto"
              />
            </Box>
          </div>
          <span className="bg-pink-300 rounded-2xl pt-1 pb-1 pr-3 pl-3 ">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
