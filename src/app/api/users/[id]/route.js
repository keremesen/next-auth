import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req,{params}) => {
  const { id } = params;
  try {
    await prisma.users.delete({
      where: {
        id: Number(id) ,
      },
    });
    return new NextResponse("User has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
