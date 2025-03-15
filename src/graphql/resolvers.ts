import { userResolver } from "./user.resolver";
import { projectResolver } from "./project.resolver";
import { issueResolver } from "./issue.resolver";
import { commentResolver } from "./comment.resolver";
export const resolvers = {
    Query: {
      ...userResolver.Query,
      ...projectResolver.Query,
      ...issueResolver.Query,
      ...commentResolver.Query,
    },
    Mutation: {
      ...userResolver.Mutation,
      ...projectResolver.Mutation,
      ...issueResolver.Mutation,
      ...commentResolver.Mutation,
    },
  };