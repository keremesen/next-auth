"use client";
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
    const password = e.target[0].value;

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      res.status === 201 && alert("basarili");
    } catch (error) {
      setErr(true);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col space-y-10" >
        <p> {session.data.user.email} </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="type your new password"
            className="bg-transparent  border rounded-md p-2"
          />
        </form>
        {err && "Somethgin Went Wrong!"}
        <button
          className="p-2 rounded-md bg-slate-200 text-black "
          onClick={() => signOut()}
        >
          Signout
        </button>
      </div>
    );
  }
};

export default Dashboard;
