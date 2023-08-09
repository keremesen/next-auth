import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.users.findMany();
    return new NextResponse(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

