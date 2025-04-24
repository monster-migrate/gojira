export class NotFoundError extends Error {
    statusCode: number;
    constructor(message = "Resource not found") {
      super(message);
      this.name = "NotFoundError";
      this.statusCode = 404;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class ConflictError extends Error {
    statusCode: number;
    constructor(message = "Conflict error") {
      super(message);
      this.name = "ConflictError";
      this.statusCode = 409;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  