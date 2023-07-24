import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
