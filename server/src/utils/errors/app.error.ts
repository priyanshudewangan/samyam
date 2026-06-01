/**
 * @file app.error.ts
 */

/**
 * Interface representing a custom application error.
 */
export interface AppError extends Error {
  statusCode: number;
}

/**
 * Represents an internal server error.
 * Implements the `AppError` interface.
 *
 * @class InternalServerError
 * @extends {Error}
 * @implements {AppError}
 */
export class InternalServerError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = "InternalServerError";
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * Represents a Bad Request error (HTTP 400).
 * This error is typically used to indicate that the server cannot process the request
 * due to client-side issues such as invalid input or malformed request syntax.
 *
 * @class BadRequestError
 * @extends {Error}
 * @implements {AppError}
 */
export class BadRequestError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Represents a "Not Found" error.
 * Implements the `AppError` interface.
 * This error is typically used to indicate that a requested resource could not be found.
 *
 * @class NotFoundError
 * @extends {Error}
 * @implements {AppError}
 */
export class NotFoundError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Represents an Unauthorized error (HTTP 401).
 * This error is typically used to indicate that the request requires user authentication.
 *
 * @class UnauthorizedError
 * @extends {Error}
 * @implements {AppError}
 */
export class UnauthorizedError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Represents a Forbidden error (HTTP 403).
 * This error is typically used to indicate that the server understands the request
 * but refuses to authorize it.
 *
 * @class ForbiddenError
 * @extends {Error}
 * @implements {AppError}
 */
export class ForbiddenError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Represents a Conflict error (HTTP 409).
 * This error is typically used to indicate that the request could not be completed
 * due to a conflict with the current state of the target resource.
 *
 * @class ConflictError
 * @extends {Error}
 * @implements {AppError}
 */
export class ConflictError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Represents an error for unimplemented functionality.
 * This error is used to indicate that a certain feature or method
 * has not been implemented yet.
 *
 * @class NotImplementedError
 * @extends {Error}
 * @implements {AppError}
 */
export class NotImplementedError extends Error implements AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 501;
    this.name = "NotImplementedError";
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
