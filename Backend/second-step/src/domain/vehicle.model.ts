import { Model } from './model';

/*
 * A car, truck, motocycle, or any transportation mode
 * that can help me to move from point A to point B on planet earth.
 */
export class Vehicle extends Model {
  public parkedLocationId: number;
  constructor(
    public readonly plateNumber: string,
    id?: number,
  ) {
    super(id);
    this.parkedLocationId = 0;
  }
}
