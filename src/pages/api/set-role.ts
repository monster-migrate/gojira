import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });
    // const userId = session.user.fdlst_private_userId;
    const { role, email }: { role?: string; email?: string } = req.body;
    if (!role || !email) return res.status(400).json({ error: "Missing data" });

    const client = await clientPromise;
    const db = client.db();

    await db.collection("users").updateOne(
        { email },
        { $set: { role } }
    );

    res.status(200).json({ success: true });
}
