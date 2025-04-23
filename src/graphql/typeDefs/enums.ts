import gql from "graphql-tag";

export const enumTypeDefs  = gql`
  enum UserRole {
    ADMIN
    MANAGER
    DEVELOPER
    USER
    VIEWER
}`;