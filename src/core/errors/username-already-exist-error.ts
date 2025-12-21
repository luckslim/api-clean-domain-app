export class UserNameAlreadyExistError extends Error {
  constructor() {
    super('username already exist error');
  }
}
