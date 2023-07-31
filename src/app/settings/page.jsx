"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [err, setErr] = useState(false);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = session.data.user.email;
    const name = e.target[0].value;
    const password = e.target[1].value;

    const newData = {};

    if (name !== session.data.user.name) {
      newData.name = name;
    }

    if (password) {
      newData.password = password;
    }

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newData,
        }),
      });
      res.status === 201 && alert("basarili");
    } catch (error) {
      setErr(true);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col space-y-4">
        <Sidebar />
        <p> {session.data.user.email} </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-sm">Name</label>
          <input
            type="text"
            defaultValue={session.data.user.name}
            className="bg-transparent  border rounded-md p-2 mb-4"
          />
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="type your new password"
            className="bg-transparent  border rounded-md p-2"
          />
          <button className="bg-green-400 rounded-md p-2 text-white mt-4">
            Update User
          </button>
        </form>
        {err && "Somethgin Went Wrong!"}
      </div>
    );
  }
};

export default Dashboard;
