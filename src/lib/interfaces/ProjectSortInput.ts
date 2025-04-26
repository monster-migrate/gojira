import { SortOrder } from "../types/sortOrder";
export interface ProjectSortInput {
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    endDate?: SortOrder;
  }