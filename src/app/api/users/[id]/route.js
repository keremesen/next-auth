import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await prisma.users.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse("User has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
export const POST = async (req, { params }) => {
  const { id } = params;
  const { newData } = await req.json();
  try {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: newData,
    });
    return new NextResponse("User updated succesfully", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
