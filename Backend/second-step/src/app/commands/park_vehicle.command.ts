import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocationRepository } from '../../infra/location.repository';
import { VehicleRepository } from '../../infra/vehicle.repository';
import { Location } from '../../domain/location.model';
import { ParkedRepository } from '../../infra/parked_vehicle.repository';

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
    private parkedRepository: ParkedRepository,
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

    if (location) {
      await this.parkedRepository.parkVehicle(vehicle.id, location.id);
      return location;
    } else {
      const newLocation = await this.locationRepository.upsert(
        new Location(payload.latitude, payload.longitude),
      );
      await this.parkedRepository.parkVehicle(vehicle.id, newLocation.id);
      return newLocation;
    }
  }
}
