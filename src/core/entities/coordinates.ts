import { DistanceFormatError } from "../errors/distance-format-error";

export class Coordinates {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {
    if (latitude < -90 || latitude > 90) {
      throw new DistanceFormatError("Latitude invalid");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitud invalid");
    }
  }
}
