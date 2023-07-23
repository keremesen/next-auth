"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <div>
        <p> {session.data.user.email} </p>
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
