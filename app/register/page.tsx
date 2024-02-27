"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
type userInfoType = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const [userInfo, setUserInfo] = useState<userInfoType | null>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [error, setError] = useState<string | null>("");
  const apiURL = process.env.API_URI;
  const signInSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/api/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (!res.ok) {
        res.json().then((message: any) => setError(message.message));
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function userInfoChange(e: any) {
    console.log(e.target.name);
    setUserInfo((prevVal: any) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      {error && (
        <Stack sx={{ width: "30%", margin: "auto" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      <div className="flex justify-center items-center pt-16 flex-col ">
        <form
          onSubmit={signInSubmit}
          className="flex gap-5 flex-col bg-gray-800 p-10 rounded-lg text-white"
        >
          <div className="flex gap-2 flex-col ">
            <label htmlFor="">Username</label>
            <input
              onChange={userInfoChange}
              value={userInfo?.username}
              className="rounded-sm p-3 text-l text-black"
              placeholder="Type username..."
              type="text"
              required
              name="username"
            />
          </div>
          <div className="flex gap-2 flex-col  ">
            <label htmlFor="">Email</label>
            <input
              onChange={userInfoChange}
              value={userInfo?.email}
              required
              className="rounded-sm p-3 text-l text-black"
              placeholder="Type email..."
              type="text"
              name="email"
            />
          </div>
          <div className="flex gap-2 flex-col ">
            <label htmlFor="">Password</label>
            <input
              onChange={userInfoChange}
              value={userInfo?.password}
              required
              className="rounded-sm p-3 text-l text-black"
              placeholder="Type password..."
              type="password"
              name="password"
            />
          </div>
          <button
            className="bg-white text-black pt-2 pb-2 font-bold"
            type="submit"
          >
            Sign up
          </button>

          <span>
            Do you have a account ? Sign in then{" "}
            <Link className="text-red-500 underline" href="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
