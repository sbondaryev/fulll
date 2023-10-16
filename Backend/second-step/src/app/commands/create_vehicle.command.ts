import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vehicle } from '../../domain/vehicle.model';
import { vehicleRepository } from '../../infra/vehicle.repository';

export class CreateVehicleCommand {
  constructor(public readonly plateNumber: string) {}
}

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler
  implements ICommandHandler<CreateVehicleCommand>
{
  execute(payload: CreateVehicleCommand) {
    return vehicleRepository.upsert(new Vehicle(payload.plateNumber));
  }
}
