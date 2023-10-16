import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { locationRepository } from '../../infra/location.repository';
import { vehicleRepository } from '../../infra/vehicle.repository';
import { Location } from '../../domain/location.model';

export class ParkVehicleCommand {
  constructor(
    public readonly plateNumber: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}

@CommandHandler(ParkVehicleCommand)
export class ParkVehicleHandler implements ICommandHandler<ParkVehicleCommand> {
  async execute(payload: ParkVehicleCommand) {
    const [vehicle, location] = await Promise.all([
      vehicleRepository.findOneByPlateNumber(payload.plateNumber),
      locationRepository.findOneByCoordinates(
        payload.latitude,
        payload.longitude,
      ),
    ]);
    if (!vehicle) {
      throw Error('Vehicle not found.');
    }

    return location
      ? vehicle.park(location)
      : vehicle.park(new Location(payload.latitude, payload.longitude));
  }
}
