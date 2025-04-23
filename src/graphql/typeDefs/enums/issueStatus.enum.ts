import gql from "graphql-tag";

export const issueStatusEnumTypeDefs = gql`
  enum IssueStatus {
  BACKLOG
  TODO
  IN_PROGRESS
  REVIEW
  DONE
}`;