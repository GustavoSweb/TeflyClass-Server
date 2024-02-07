function NotValid(message) {
  this.message = message;
  this.name = "NotValid";
}
function NotExistValue(message) {
  this.message = message;
  this.name = "NotExistValue";
}
function ConflictData(message) {
  this.message = message;
  this.name = "ConflictData";
}
module.exports = { NotValid, NotExistValue, ConflictData};
