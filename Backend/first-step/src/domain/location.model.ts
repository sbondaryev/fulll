import { Model } from './model';

/*
 * Geographic coordinates expressed in decimal degrees
 * https://www.latlong.net/
 */
export class Coordinates {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}
}

/*
 * A way to localize on planet earth, like GPS coordinates for example.
 */
export class Location extends Model {
  placedVehicleId: string | undefined;

  constructor(
    id: string,
    public coordinates: Coordinates,
  ) {
    super(id);
  }

  hold(vehicleId: string): Location {
    if (this.isHold()) {
      throw Error('A vehicle is already parked at this location.');
    }
    this.placedVehicleId = vehicleId;
    return this;
  }

  free(): Location {
    this.placedVehicleId = '';
    return this;
  }

  isHold(): boolean {
    return Boolean(this.placedVehicleId);
  }
}
