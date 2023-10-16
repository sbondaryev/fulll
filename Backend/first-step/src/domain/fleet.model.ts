import { Model } from './model';

/*
 * A collection a distinct vehicles.
 */
export class Fleet extends Model {
  private readonly vehicles: string[] = [];

  constructor(
    id: string,
    public readonly userId: string,
  ) {
    super(id);
  }

  addRegistration(vehicleId: string): void {
    if (this.hasVehicle(vehicleId)) {
      throw new Error(
        'This vehicle has already been registered into the fleet.',
      );
    }
    this.vehicles.push(vehicleId);
  }

  getRegistrations(): string[] {
    return this.vehicles;
  }

  hasVehicle(vehicleId: string): boolean {
    return Boolean(this.vehicles.includes(vehicleId));
  }
}
