import gql from "graphql-tag";

export const userRoleEnumTypeDefs  = gql`
  enum UserRole {
    ADMIN
    MANAGER
    DEVELOPER
    USER
    VIEWER
}`;