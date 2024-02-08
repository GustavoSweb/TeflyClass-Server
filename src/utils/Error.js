import statusCode from './httpStatusCode'
const {BAD_REQUEST, CONFLICT, NOT_FOUND} = statusCode

class NotValid extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST
  }
}

class NotExistValue extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND
  }
}

class ConflictData extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT
  }
}

export { NotValid, NotExistValue, ConflictData };