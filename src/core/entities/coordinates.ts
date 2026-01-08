export interface CoordinatesProps {
  latitude: number;
  longitude: number;
}

export class Coordinates {
  private constructor(private props: CoordinatesProps) {}

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  static create(props: CoordinatesProps) {
    if (props.latitude < -90 || props.latitude > 90) {
      throw new Error('Invalid latitude');
    }

    if (props.longitude < -180 || props.longitude > 180) {
      throw new Error('Invalid longitude');
    }

    return new Coordinates(props);
  }
}
