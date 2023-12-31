"use client";
import Layout from "@/components/Layout/Layout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

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
    const phone = e.target[1].value;
    const password = e.target[2].value;

    const newData = {};

    if (name !== session.data.user.name) {
      newData.name = name;
    }

    if (phone) {
      newData.phone = phone;
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
      res.status === 201 &&
        Swal.fire("Good job!", "User Successfully Updated!", "success");
    } catch (error) {
      setErr(true);
    }
  };

  if (session.status === "authenticated") {
    return (
      <Layout>
        <div className="flex w-full flex-col items-center  justify-center   space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-sm">Name</label>
            <input
              type="text"
              defaultValue={session.data.user.name}
              className="bg-transparent  border rounded-md p-2 mb-4"
            />
            <label className="text-sm">Phone</label>
            <input
              type="text"
              defaultValue={session.data.user.phone}
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
      </Layout>
    );
  }
};

export default Dashboard;
