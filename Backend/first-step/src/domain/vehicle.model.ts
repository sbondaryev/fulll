import { Coordinates, Location } from './location.model';
import { Model } from './model';

const GPS_TOLERACE = 0.00002697; // 3m

/*
 * A car, truck, motocycle, or any transportation mode
 * that can help me to move from point A to point B on planet earth.
 */
export class Vehicle extends Model {
  constructor(id: string) {
    super(id);
  }

  park(location: Location, gpsCoordinates: Coordinates): void {
    if (!this.checkLocation(location.coordinates, gpsCoordinates)) {
      throw Error(
        'Vehicle coordinates do not match the designated parking location.',
      );
    }
    location.hold(this.getId());
  }

  checkLocation(
    coordinates: Coordinates,
    gpsCoordinates: Coordinates,
  ): boolean {
    return (
      Math.abs(gpsCoordinates.latitude - coordinates.latitude) < GPS_TOLERACE &&
      Math.abs(gpsCoordinates.longitude - coordinates.longitude) < GPS_TOLERACE
    );
  }
}
