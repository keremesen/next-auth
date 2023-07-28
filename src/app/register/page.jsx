"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [err, setErr] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 &&
        router.push("/?success=Account has been created");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <main className="flex flex-col items-center space-y-2 ">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          className="bg-transparent  border rounded-md p-2"
        />
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
          Register
        </button>
      </form>
      {err && "Something went wrong!"}
      <Link className="text-sm" href="/">
        Already have an account? Login
      </Link>
    </main>
  );
};

export default Register;
