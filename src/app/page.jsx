"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-2 justify-center  ">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
          className=" p-2 w-full  rounded-md bg-slate-200 text-black text-sm items-center flex justify-center space-x-2"
          onClick={() => signIn("google")}
        >
          <Image src="/assets/google.svg" width={20} height={20} alt="Google" />
          <span>Login With Google</span>
        </button>
        <button
          className=" p-2 w-full  rounded-md bg-gray-800 text-white text-sm items-center flex justify-center space-x-2"
          onClick={() => signIn("github")}
        >
          <Image src="/assets/github.svg" width={20} height={20} alt="Github" />
          <span>Login With Github</span>
        </button>
        <Link href="/register" className="text-sm">
          Create New Account
        </Link>
      </div>
    </main>
  );
}
