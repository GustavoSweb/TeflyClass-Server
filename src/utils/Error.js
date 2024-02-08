class NotValid extends Error {
  constructor(message) {
    super(message);
    this.name = "NotValid";
  }
}

class NotExistValue extends Error {
  constructor(message) {
    super(message);
    this.name = "NotExistValue";
  }
}

class ConflictData extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictData";
  }
}

export { NotValid, NotExistValue, ConflictData };