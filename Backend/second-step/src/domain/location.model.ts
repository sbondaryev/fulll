import { Model } from './model';

/*
 * A way to localize on planet earth, like GPS coordinates for example.
 * https://www.latlong.net/
 */
export class Location extends Model {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    id?: number,
  ) {
    super(id);
  }
}
