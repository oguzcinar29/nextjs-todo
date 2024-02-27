"use client";
import Link from "next/link";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { apiURL } from "@/url";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<string | null>("");

  const router = useRouter();
  const signInSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiURL}/api/user/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      if (!res.ok) {
        res.json().then((message) => setErr(message.message));
      } else {
        res
          .json()
          .then(
            (id) =>
              typeof window !== "undefined" &&
              localStorage.setItem("user", JSON.stringify(id.id))
          );
        router.push("/");
        router.refresh();
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
      {err && (
        <Stack sx={{ width: "30%", margin: "auto" }} spacing={2}>
          <Alert severity="error">{err}</Alert>
        </Stack>
      )}
      <div className="flex justify-center items-center pt-36 ">
        <form
          onSubmit={signInSubmit}
          className="flex gap-5 flex-col bg-gray-800 p-10 rounded-lg text-white"
        >
          <div className="flex gap-2 flex-col ">
            <label htmlFor="">Email</label>
            <input
              className="rounded-sm p-3 text-l text-black"
              placeholder="Type email..."
              type="text"
              value={userInfo?.email}
              name="email"
              onChange={userInfoChange}
            />
          </div>
          <div className="flex gap-2 flex-col ">
            <label htmlFor="">Password</label>
            <input
              className="rounded-sm p-3 text-l  text-black"
              placeholder="Type password..."
              type="password"
              name="password"
              value={userInfo?.password}
              onChange={userInfoChange}
            />
          </div>

          <button
            className="bg-white text-black pt-2 pb-2 font-bold"
            type="submit"
          >
            Sign in
          </button>
          <span>
            Do you have no account ? Get one{" "}
            <Link className="text-red-500 underline" href="/register">
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
