import type { Coordinates } from '@/core/entities/coordinates';

export class DistanceCalculator {
  private static toRadians(value: number): number {
    return (value * Math.PI) / 180;
  }

  static calculateInKm(from: Coordinates, to: Coordinates): number {
    const R = 6371; // raio da Terra em km

    const dLat = this.toRadians(to.latitude - from.latitude);
    const dLon = this.toRadians(to.longitude - from.longitude);

    const lat1 = this.toRadians(from.latitude);
    const lat2 = this.toRadians(to.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
