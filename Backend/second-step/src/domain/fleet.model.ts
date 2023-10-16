import { Model } from './model';

/*
 * A collection a distinct vehicles.
 */
export class Fleet extends Model {
  private vehicles: number[] = [];

  constructor(
    public readonly userId: number,
    id?: number,
  ) {
    super(id);
  }

  addRegistration(vehicleId: number): void {
    if (this.hasVehicle(vehicleId)) {
      throw new Error(
        'This vehicle has already been registered into the fleet.',
      );
    }
    this.vehicles.push(vehicleId);
  }

  setRegistrations(vehicles: number[]): void {
    this.vehicles = vehicles;
  }

  getRegistrations(): number[] {
    return this.vehicles;
  }

  hasVehicle(vehicleId: number): boolean {
    return Boolean(this.vehicles.includes(vehicleId));
  }
}
