import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      fdlst_private_userId: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
