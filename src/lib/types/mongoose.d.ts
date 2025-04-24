import "mongoose";

declare module "mongoose" {
  interface Query<Result = unknown, Doc = unknown, THelpers = unknown> {
    cacheQuery(ttl?: number): Query<Result, Doc, THelpers>;
    useCache?: boolean;
    cacheKey?: string;
  }
}
