import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth({
  //adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      email: "credentials",
      password: "credentials",

      async authorize(credentials) {
        try {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              const { id, email, phone, name } = user;
              return { id, email, phone, name };
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  // callbacks: {
  //   session({ session, user }) {
  //     session.user.role = user.role
  //     return session
  //   }
  // },
  pages: {
    error: "/",
  },
});

export { handler as GET, handler as POST };
