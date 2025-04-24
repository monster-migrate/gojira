import gql from "graphql-tag";
import { userRoleEnumTypeDefs } from "./typeDefs/enums/userRole.enum";
import { userTypeDefs } from "./typeDefs/user.gqlschema";
import { userQueries } from "./queries/user.query";
import { userMutations } from "./mutations/user.mutation";

// import { issueStatusEnumTypeDefs } from "./typeDefs/enums/issueStatus.enum";
// import { priorityEnumTypeDefs } from "./typeDefs/enums/priority.enum";
// import { issueTypeEnumTypeDefs } from "./typeDefs/enums/issueType.enum";
// import { sprintStatusEnumTypeDefs } from "./typeDefs/enums/sprintStatus.enum";
// import { sprintTypeDefs } from "./typeDefs/sprint.gqlschema";
// import { issueTypeDefs } from "./typeDefs/issue.gqlschema";
// import { boardTypeDefs } from "./typeDefs/board.gqlschema";
// import { commentTypeDefs } from "./typeDefs/comment.gqlschema";
// import { attachmentTypeDefs } from "./typeDefs/attachment.gqlschema";
import { projectTypeDefs } from "./typeDefs/project.gqlschema";
import { projectQueries } from "./queries/project.query";
import { projectMutations } from "./mutations/project.mutation";

// ${issueStatusEnumTypeDefs}
// ${priorityEnumTypeDefs}
// ${issueTypeEnumTypeDefs}
// ${sprintStatusEnumTypeDefs}
// ${sprintTypeDefs}
// ${issueTypeDefs}
// ${boardTypeDefs}
// ${commentTypeDefs}
// ${attachmentTypeDefs}
export const typeDefs = gql`
${userRoleEnumTypeDefs}
${userTypeDefs}
${userQueries}
${userMutations}

${projectTypeDefs}
${projectQueries}
${projectMutations}
`;
