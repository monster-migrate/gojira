import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../middleware/db-connect";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
interface contextInterface {
  session: Session | null;
}
const server = new ApolloServer<contextInterface>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    console.log("SESSION FROM NEXT-AUTH:", session);
    return { session };
  },
});
const allowCors =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Allow", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      res.status(200).end();
    }
    return await fn(req, res);
  };
const connectDB =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    return await fn(req, res);
  };
export default connectDB(allowCors(handler));
