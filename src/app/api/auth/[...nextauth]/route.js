import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email"

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth({
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
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
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
              console.log(user.role)
              console.log(user.phone)
              const { id, email, phone, name,role } = user;
              return user
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
 adapter: PrismaAdapter(prisma),
 callbacks: {
  async jwt(token, user) {
    // user is the user object returned from the authorize function in credentials provider
    // token is the existing token object which will be updated
    if (user?.role) {
      token.role = user.role;
    }
    return token;
  },
  async session(session, token) {
    // session is the current session object
    // token is the token object in the jwt callback
    if (token?.role) {
      session.user.role = token.role;
    }
    return session;
  },
},

  // callbacks: {
  //   session({ session, user }) {
  //     console.log(session)
  //     console.log(user)
  //     // session.user.role = user.role
  //     // return session
  //   }
  // },
  // callbacks: {
  //   async jwt({ token }) {
  //    console.log(token)    
      
  //   },
  // },
  pages: {
    error: "/",
  },
});

export { handler as GET, handler as POST };
