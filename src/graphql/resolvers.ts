import { projectResolver } from "./project.resolver";
import { userResolver } from "./user.resolver";
export const resolvers = {
    Query: {
      ...userResolver.Query,
      ...projectResolver.Query
    },
    Mutation: {
      ...userResolver.Mutation,
      ...projectResolver.Mutation
    },
  };