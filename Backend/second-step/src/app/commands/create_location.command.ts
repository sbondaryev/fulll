import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Location } from '../../domain/location.model';
import { LocationRepository } from '../../infra/location.repository';

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
  constructor(private locationRepository: LocationRepository) {}

  execute(payload: CreateLocationCommand) {
    return this.locationRepository.upsert(
      new Location(payload.latitude, payload.longitude),
    );
  }
}
