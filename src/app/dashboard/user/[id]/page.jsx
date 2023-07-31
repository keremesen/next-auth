"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";

const getUser = async (id) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    return notFound();
  }

  return res.json();
};
const UserPage = ({ params }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser(params.id).then((result) => setUser(result));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;

    const newData = {
      name: name,
      email: email,
    };
    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newData,
        }),
      });
      res.status === 201 && alert("basarili");
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <Sidebar />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-sm">Name</label>
        <input
          type="text"
          defaultValue={user.name}
          className="bg-transparent  border rounded-md p-2 mb-4"
        />
        <label className="text-sm">Email</label>
        <input
          type="text"
          defaultValue={user.email}
          className="bg-transparent  border rounded-md p-2"
        />
        <button className="bg-green-400 rounded-md p-2 text-white mt-4">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserPage;
