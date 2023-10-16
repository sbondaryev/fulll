import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { fleetRepository } from '../../infra/fleet.repository';

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
  async execute(payload: RegisterVehicleCommand) {
    const fleet = await fleetRepository.findOneById(payload.fleetId);
    if (!fleet) {
      throw Error('Fleet not found.');
    }

    fleet.addRegistration(payload.vehicleId);
    await fleetRepository.upsert(fleet);
    return fleet;
  }
}
