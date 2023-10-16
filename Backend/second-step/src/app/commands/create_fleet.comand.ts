import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Fleet } from '../../domain/fleet.model';
import { fleetRepository } from '../../infra/fleet.repository';

export class CreateFleetCommand {
  constructor(public readonly userId: number) {}
}

@CommandHandler(CreateFleetCommand)
export class CreateFleetHandler implements ICommandHandler<CreateFleetCommand> {
  execute(payload: CreateFleetCommand) {
    return fleetRepository.upsert(new Fleet(payload.userId));
  }
}
