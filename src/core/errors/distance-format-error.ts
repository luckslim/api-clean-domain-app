export class DistanceFormatError extends Error {
  constructor(message: string) {
    super(`${message}`);
  }
}
