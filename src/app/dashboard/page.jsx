"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
// const getUsers = async () => {
//   const res = await fetch("/api/users", {
//     cache: "no-cache",
//   });
//   if (!res.ok) {
//     return notFound();
//   }

//   return res.json();
// };

const handleDelete = async (id) => {
  try {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [users, setUsers] = useState(null);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR("/api/users", fetcher);

  // useEffect(() => {
  //   getUsers().then((result) => setUsers(result));
  // }, []);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col space-y-4">
        <Sidebar
          userEmail={session.data.user.email}
          userName={session.data.user.name}
        />
        {isLoading
          ? "Loading"
          : data.map((user) => (
              <div href="/" key={user.id}>
                <p> {user.name} </p>
                <p> {user.email} </p>
                <span
                  className="text-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  X
                </span>
              </div>
            ))}
      </div>
    );
  }
};

export default Dashboard;
