import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  const { email, newData } = await req.json();

  if (newData.password) {
    newData.password = await bcrypt.hash(newData.password, 10);
  }

  try {
    const updatedUser = await prisma.users.update({
      where: {
        email: email,
      },
      data: newData,
    });
    return new NextResponse("User update succesfully", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
