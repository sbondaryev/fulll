import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocationRepository } from '../../infra/location.repository';
import { VehicleRepository } from '../../infra/vehicle.repository';
import { Location } from '../../domain/location.model';
import { Vehicle } from '../../domain/vehicle.model';

export class ParkVehicleCommand {
  constructor(
    public readonly plateNumber: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}

@CommandHandler(ParkVehicleCommand)
export class ParkVehicleHandler implements ICommandHandler<ParkVehicleCommand> {
  constructor(
    private locationRepository: LocationRepository,
    private vehicleRepository: VehicleRepository,
  ) {}

  async execute(payload: ParkVehicleCommand) {
    const [vehicle, location] = await Promise.all([
      this.vehicleRepository.findOneByPlateNumber(payload.plateNumber),
      this.locationRepository.findOneByCoordinates(
        payload.latitude,
        payload.longitude,
      ),
    ]);
    if (!vehicle) {
      throw Error('Vehicle not found.');
    }

    return location
      ? this.park(vehicle, location)
      : this.park(vehicle, new Location(payload.latitude, payload.longitude));
  }

  async park(vehicle: Vehicle, newLocation: Location) {
    if (newLocation.isHold()) {
      throw Error('A vehicle is already parked at this location.');
    }

    // Free old location if holded
    if (vehicle.parkedLocationId) {
      const oldLocation = await this.locationRepository.findOneById(
        vehicle.parkedLocationId,
      );
      oldLocation.free();
      await this.locationRepository.upsert(oldLocation);
    }

    // Hold new location
    newLocation.hold(vehicle.id);
    const persistedNewLocation =
      await this.locationRepository.upsert(newLocation);

    vehicle.parkedLocationId = persistedNewLocation.id;
    return this.vehicleRepository.upsert(vehicle);
  }
}
