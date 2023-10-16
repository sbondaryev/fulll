import { Model } from './model';

/*
 * A way to localize on planet earth, like GPS coordinates for example.
 * https://www.latlong.net/
 */
export class Location extends Model {
  public placedVehicleId: number;

  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    id?: number,
  ) {
    super(id);
    this.placedVehicleId = 0;
  }

  hold(vehicleId: number): Location {
    this.placedVehicleId = vehicleId;
    return this;
  }

  free(): Location {
    this.placedVehicleId = 0;
    return this;
  }

  isHold(): boolean {
    return Boolean(this.placedVehicleId);
  }
}
