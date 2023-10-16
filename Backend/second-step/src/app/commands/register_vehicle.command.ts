import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FleetRepository } from '../../infra/fleet.repository';

export class RegisterVehicleCommand {
  constructor(
    public readonly vehicleId: number,
    public readonly fleetId: number,
  ) {}
}

@CommandHandler(RegisterVehicleCommand)
export class RegisterVehicleHandler
  implements ICommandHandler<RegisterVehicleCommand>
{
  constructor(private fleetRepository: FleetRepository) {}

  async execute(payload: RegisterVehicleCommand) {
    const fleet = await this.fleetRepository.findOneById(payload.fleetId);
    if (!fleet) {
      throw Error('Fleet not found.');
    }

    fleet.addRegistration(payload.vehicleId);
    await this.fleetRepository.upsert(fleet);
    return fleet;
  }
}
