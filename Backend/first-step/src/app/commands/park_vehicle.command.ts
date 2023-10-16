import { Coordinates } from '../../domain/location.model';
import { locationRepository, vehicleRepository } from '../../infra/repository';
import { commandBus, CommandHandler } from '../cqrs';

export class ParkVehicleCommand {
  constructor(
    public readonly vehicleId: string,
    public readonly locationId: string,
    public readonly gps_latitude: number,
    public readonly gps_longitude: number,
  ) {}
}

class ParkVehicleHandler implements CommandHandler {
  async execute(payload: ParkVehicleCommand) {
    const [vehicle, location] = await Promise.all([
      vehicleRepository.findOneById(payload.vehicleId),
      locationRepository.findOneById(payload.locationId),
    ]);
    const gpsCoordinates = new Coordinates(
      payload.gps_latitude,
      payload.gps_longitude,
    );

    vehicle.park(location, gpsCoordinates);

    await locationRepository.upsert(location);
  }
}

commandBus.register(ParkVehicleCommand.name, new ParkVehicleHandler());
