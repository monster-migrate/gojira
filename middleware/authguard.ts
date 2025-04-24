import { GraphQLError } from "graphql";
import { Session } from "next-auth";

interface paramInterface {
  _id: string;
  email: string | null | undefined;
  role: string;
}

interface contextInterface {
  session: Session | null;
}

export const authGuard = (
  param: paramInterface,
  context: contextInterface
): boolean | GraphQLError => {
  const user = context.session?.user;

  if (!user || !user.fdlst_private_userId) {
    return new GraphQLError("User is not authenticated", {
      extensions: {
        http: { status: 401 },
        code: "UNAUTHENTICATED",
      },
    });
  }

  if (user.fdlst_private_userId !== param._id) {
    return new GraphQLError("User is not authorized", {
      extensions: {
        http: { status: 403 },
        code: "UNAUTHORIZED",
      },
    });
  }

  return true;
};
