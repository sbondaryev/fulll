import { fleetRepository } from '../../infra/repository';
import { commandBus, CommandHandler } from '../cqrs';

export class RegisterVehicleCommand {
  constructor(
    public readonly vehicleId: string,
    public readonly fleetId: string,
  ) {}
}

class RegisterVehicleHandler implements CommandHandler {
  async execute(payload: RegisterVehicleCommand) {
    const fleet = await fleetRepository.findOneById(payload.fleetId);
    fleet.addRegistration(payload.vehicleId);

    await fleetRepository.upsert(fleet);
  }
}

commandBus.register(RegisterVehicleCommand.name, new RegisterVehicleHandler());
