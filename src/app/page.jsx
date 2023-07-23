"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }
  return (
    <main className="flex flex-col items-center space-y-2 ">
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="bg-transparent  border rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="bg-transparent  border rounded-md p-2"
        />
        <button className="bg-green-400 rounded-md p-2 text-white">
          Login
        </button>
      </form>
      <button
        className=" p-2 w-full  rounded-md bg-slate-200 text-black text-sm"
        onClick={() => signIn("google")}
      >
        Login With Google
      </button>
      <button
        className=" p-2 w-full  rounded-md bg-gray-800 text-white text-sm"
        onClick={() => signIn("github")}
      >
        Login With Github
      </button>
      <Link href="/" className="text-sm" >
        Create New Account
      </Link>
    </main>
  );
}
