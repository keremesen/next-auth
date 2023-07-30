"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ userEmail, userName }) => {
  const pathname = usePathname();
  return (
    <div className="bg-[#2222] absolute left-0 top-0 w-80 h-screen text-white flex flex-col items-center p-4">
      <h1 className="text-5xl font-bold">Ovinot</h1>
      <div className="h-28 w-full bg-[#3333] flex-1 my-4 p-4 items-center justify-sstart space-y-4 flex flex-col rounded-md ">
        <Link
          className={`w-full rounded-md p-2 hover:bg-[#4444] ${
            pathname == "/dashboard" ? "bg-[#4444]" : ""
          }`}
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={`w-full rounded-md p-2 hover:bg-[#4444] ${
            pathname == "/settings" ? "bg-[#4444]" : ""
          }`}
          href="/settings"
        >
          Settings
        </Link>
      </div>
      <div className="h-28 w-full bg-[#3333] flex p-4 items-center justify-around rounded-md">
        <div className="flex flex-col ">
          <h2>{userEmail} </h2>
          <h2>{userName} </h2>
        </div>
        <button
          className="hover:bg-[#4444] p-1 rounded-md"
          onClick={() => signOut()}
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
