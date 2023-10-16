import { Location } from './location.model';
import { Model } from './model';
import { vehicleRepository } from '../infra/vehicle.repository';
import { locationRepository } from '../infra/location.repository';

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

  async park(newLocation: Location): Promise<Vehicle> {
    if (newLocation.isHold()) {
      throw Error('A vehicle is already parked at this location.');
    }

    // Free old location if holded
    if (this.parkedLocationId) {
      const oldLocation = await locationRepository.findOneById(
        this.parkedLocationId,
      );
      oldLocation.free();
      await locationRepository.upsert(oldLocation);
    }

    // Hold new location
    newLocation.hold(this.id);
    const persistedNewLocation = await locationRepository.upsert(newLocation);

    this.parkedLocationId = persistedNewLocation.id;
    return vehicleRepository.upsert(this);
  }
}
