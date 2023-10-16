import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vehicle } from '../../domain/vehicle.model';
import { VehicleRepository } from '../../infra/vehicle.repository';

export class CreateVehicleCommand {
  constructor(public readonly plateNumber: string) {}
}

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler
  implements ICommandHandler<CreateVehicleCommand>
{
  constructor(private vehicleRepository: VehicleRepository) {}

  execute(payload: CreateVehicleCommand) {
    return this.vehicleRepository.upsert(new Vehicle(payload.plateNumber));
  }
}
