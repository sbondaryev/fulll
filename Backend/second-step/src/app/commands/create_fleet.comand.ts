import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Fleet } from '../../domain/fleet.model';
import { FleetRepository } from '../../infra/fleet.repository';

export class CreateFleetCommand {
  constructor(public readonly userId: number) {}
}

@CommandHandler(CreateFleetCommand)
export class CreateFleetHandler implements ICommandHandler<CreateFleetCommand> {
  constructor(private fleetRepository: FleetRepository) {}

  execute(payload: CreateFleetCommand) {
    return this.fleetRepository.upsert(new Fleet(payload.userId));
  }
}
