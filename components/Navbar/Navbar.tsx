"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  const [loop, setLoop] = useState();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem("user") !== null) {
        setIsLoggedIn(true);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <nav className="bg-sky-950 justify-between items-center flex p-4 text-white">
      <div className="flex gap-3">
        <Link href="/">
          <FaHome size={24} />
        </Link>
        {isLoggedIn && (
          <Link href="/addTicket">
            <FaTicketAlt size={24} />
          </Link>
        )}
        {!isLoggedIn && (
          <Link href="/login">
            <PersonIcon />
          </Link>
        )}
        {isLoggedIn && (
          <span
            className="cursor-pointer"
            onClick={() => {
              localStorage.removeItem("user");
              console.log("hey3");
              setIsLoggedIn(false);
              router.push("/login");
            }}
          >
            <ExitToAppIcon />
          </span>
        )}
      </div>
      <span>oguzcinar187@gmail.com</span>
    </nav>
  );
}
