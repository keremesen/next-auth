"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

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
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser(params.id).then((result) => setUser(result));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  function handleRoleChange(e) {
    const selectedRole = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      role: selectedRole,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const phone = e.target[1].value;
    const email = e.target[2].value;
    const role = Boolean(user.role);

    const newData = {
      name: name,
      phone: phone,
      email: email,
      role: role,
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
      res.status === 201 &&
        Swal.fire("Good job!", "User Successfully Updated!", "success");
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/");
  }
  if (session.status === "authenticated") {
    return (
      <Layout>
        <div className="flex w-full items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-sm">Name</label>
            <input
              type="text"
              defaultValue={user.name}
              className="bg-transparent  border rounded-md p-2 mb-4"
            />
            <label className="text-sm">Phone</label>
            <input
              type="text"
              defaultValue={user.phone}
              className="bg-transparent  border rounded-md p-2 mb-4"
            />
            <label className="text-sm">Email</label>
            <input
              type="text"
              defaultValue={user.email}
              className="bg-transparent  border rounded-md p-2"
            />
            <label className="text-sm">Role</label>
            <select
              defaultValue={user.role}
              onChange={handleRoleChange}
              className="bg-transparent  border rounded-md p-2 focus:outline-none"
            >
              <option value={true}>Admin</option>
              <option value={false}>Member</option>
            </select>
            <button className="bg-green-400 rounded-md p-2 text-white mt-4">
              Update User
            </button>
          </form>
        </div>
      </Layout>
    );
  }
};

export default UserPage;
