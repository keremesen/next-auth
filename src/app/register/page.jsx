"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const [err, setErr] = useState(false);

  const router = useRouter();

  const schema = z.object({
    name: z.string().max(20),
    phone: z.string().regex(/^0\d{10}$/),
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          password: data.password,
        }),
      });

      res.status === 201 && router.push("/?success=Account has been created");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-2 w-64 ">
        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="bg-transparent  border rounded-md p-2"
            {...register("name")}
          />
           {errors.name && (
            <span className=" text-red-700">{errors.name.message}</span>
          )}
          <input
            type="text"
            placeholder="Phone"
            required
            className="bg-transparent  border rounded-md p-2"
            {...register("phone")}
          />
           {errors.phone && (
            <span className=" text-red-700">{errors.phone.message}</span>
          )}
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
            <span className=" text-red-700">{errors.password.message}</span>
          )}
          <button className="bg-green-400 rounded-md p-2 text-white">
            Register
          </button>
        </form>
        {err && "Something went wrong!"}
        <Link className="text-sm" href="/">
          Already have an account? Login
        </Link>
      </div>
    </main>
  );
};

export default Register;
