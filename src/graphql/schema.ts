import gql from "graphql-tag";

export const typeDefs = gql`
  enum UserRole {
    ADMIN
    MANAGER
    DEVELOPER
    USER
    VIEWER
  }

  type User {
    name: String!
    email: String!
    password: String!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: UserRole!
  }

  input UpdateUserInput {
    name: String
    email: String
    role: UserRole
    password: String
    UpdatedAt: String
  }

  type Project {
    name: String!
    description: String!
    key: String!
    owner: User!
    members: [User]
    issues: [Issue]
    status: ProjectStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum ProjectStatus {
    ACTIVE
    ARCHIVED
    COMPLETED
  }

  input CreateProjectInput {
    name: String!
    description: String!
    owner: CreateUserInput!
    status: ProjectStatus
  }

  input UpdateProjectInput {
    name: String
    description: String
    status: ProjectStatus
    members: [CreateUserInput]
    issues: [CreateIssueInput]
  }

  type Issue {
    issueId: String!
    title: String!
    description: String
    status: IssueStatus!
    priority: IssuePriority!
    type: IssueType!
    reporter: User!
    assignee: User
    projectKey: String!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  enum IssueStatus {
    OPEN
    IN_PROGRESS
    RESOLVED
    CLOSED
  }

  enum IssuePriority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  enum IssueType {
    TASK
    FEATURE
    BUG
  }

  input CreateIssueInput {
    title: String!
    description: String!
    status: IssueStatus!
    priority: IssuePriority!
    type: IssueType!
    reporter: CreateUserInput
    assignee: CreateUserInput
    project_key: String
  }

  input UpdateIssueInput {
    title: String
    description: String
    status: IssueStatus
    priority: IssuePriority
    type: IssueType
  }

  type Comment {
    commentId: String!
    content: String!
    author: User
    createdAt: String!
    updatedAt: String!
    tags: [String]
  }

  input CreateCommentInput {
    content: String!
    author: CreateUserInput
    tags: [String]
  }

  input UpdateCommentInput {
    content: String
    tags: [String]
  }

  type Query {
    getUser(email: String!): User
    getUsers: [User!]
    getProject(key: String): Project
    getProjects: [Project!]
    getIssue(issueId: String!): Issue
    getIssues: [Issue!]
    getComment(commentId: String!): Comment
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: UserRole!
    ): User!
    updateUser(
      name: String
      email: String
      password: String
      role: UserRole
    ): User!
    deleteUser(email: String!): User

    createProject(
      name: String!
      description: String!
      owner: CreateUserInput!
      status: ProjectStatus!
    ): Project!
    updateProject(
      key: String
      name: String
      description: String
      status: ProjectStatus
      members: [CreateUserInput]
      issues: [CreateIssueInput]
    ): Project!
    deleteProject(key: String!): Project

    createIssue(
      title: String!
      description: String!
      status: IssueStatus!
      priority: IssuePriority!
      type: IssueType!
      reporterEmail: String!
      assigneeEmail: String
      projectKey: String!
    ): Issue!
    updateIssue(
      issueId: String!
      title: String
      description: String
      status: IssueStatus
      priority: IssuePriority
      type: IssueType
      assigneeEmail: String
    ): Issue!
    deleteIssue(issueId: String!): Issue!

    createComment(
      content: String!
      author_email: String!
      tags: [String]
    ): Comment!
    updateComment(commentId: String!, content: String, tags: [String]): Comment!
    deleteComment(commentId: String!): Comment!
  }
`;
