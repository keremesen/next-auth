"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const onSubmit = async (data) => {
    signIn("credentials", { email: data.email, password: data.password });
  };
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-2 justify-center w-64 ">
        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            placeholder="Email"
            required
            className="bg-transparent  border rounded-md p-2"
            {...register("email")}
          />
          {errors.email && (
            <span className=" text-red-700">{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            required
            className="bg-transparent  border rounded-md p-2"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-700">{errors.password.message}</span>
          )}
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
          className=" p-2 w-full  rounded-md bg-blue-300 text-white text-sm items-center flex justify-center space-x-2"
          onClick={() => signIn("email")}
        >
          {/* <Image src="/assets/github.svg" width={20} height={20} alt="Email" /> */}
          <span>Login With Email</span>
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
