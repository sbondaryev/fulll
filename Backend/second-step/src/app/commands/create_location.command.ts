import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Location } from '../../domain/location.model';
import { locationRepository } from '../../infra/location.repository';

export class CreateLocationCommand {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler
  implements ICommandHandler<CreateLocationCommand>
{
  execute(payload: CreateLocationCommand) {
    return locationRepository.upsert(
      new Location(payload.latitude, payload.longitude),
    );
  }
}
