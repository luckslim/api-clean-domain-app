export class TimeListedError extends Error {
  constructor() {
    super('there are not time in store');
  }
}
