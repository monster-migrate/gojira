import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import { createHash } from "crypto";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { NextAuthOptions } from "next-auth";

const createUserId = (base: string): string => {
    return createHash("sha256").update(base).digest("hex");
};
export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise, { databaseName: "gojira" }),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "database"
    },
    callbacks: {
        async jwt({ token }) {
            if (token?.email && !token.fdlst_private_userId) {
                token.fdlst_private_userId = createUserId(token.email)
            }
            return token;
        },
        async session({ session, user }) {
            if (session?.user?.email && !session.user.fdlst_private_userId) {
                session.user.fdlst_private_userId = createUserId(session.user.email)
                session.user.role = user.role || "user";
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        newUser: '/auth/newuser',
    }
};
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, authOptions);
}