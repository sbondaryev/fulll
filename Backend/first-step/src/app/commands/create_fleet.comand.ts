import { Fleet } from '../../domain/fleet.model';
import { fleetRepository } from '../../infra/repository';
import { commandBus, CommandHandler } from '../cqrs';

export class CreateFleetCommand {
  constructor(
    public readonly fleetId: string,
    public readonly userId: string,
  ) {}
}

class CreateFleetHandler implements CommandHandler {
  execute(payload: CreateFleetCommand) {
    return fleetRepository.upsert(new Fleet(payload.fleetId, payload.userId));
  }
}

commandBus.register(CreateFleetCommand.name, new CreateFleetHandler());
