import { Vehicle } from '../../domain/vehicle.model';
import { vehicleRepository } from '../../infra/repository';
import { commandBus, CommandHandler } from '../cqrs';

export class CreateVehicleCommand {
  constructor(public readonly vehicleId: string) {}
}

class CreateVehicleHandler implements CommandHandler {
  execute(payload: CreateVehicleCommand) {
    return vehicleRepository.upsert(new Vehicle(payload.vehicleId));
  }
}

commandBus.register(CreateVehicleCommand.name, new CreateVehicleHandler());
