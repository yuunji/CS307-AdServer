class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = "notFound";
    this.errorMsg = message;
    Error.captureStackTrace(this, NotFoundError);
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = "badRequest";
    this.errorMsg = message;
    Error.captureStackTrace(this, BadRequestError);
  }
}

class QueryFailError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = "queryFail";
    this.errorMsg = message;
    Error.captureStackTrace(this, QueryFailError);
  }
}

module.exports = {
  NotFoundError: NotFoundError,
  BadRequestError: BadRequestError,
  QueryFailError: QueryFailError
};