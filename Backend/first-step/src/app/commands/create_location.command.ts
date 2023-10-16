import { Coordinates, Location } from '../../domain/location.model';
import { locationRepository } from '../../infra/repository';
import { commandBus, CommandHandler } from '../cqrs';

export class CreateLocationCommand {
  constructor(
    public readonly locaitonId: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}

class CreateLocationHandler implements CommandHandler {
  execute(payload: CreateLocationCommand) {
    return locationRepository.upsert(
      new Location(
        payload.locaitonId,
        new Coordinates(payload.latitude, payload.longitude),
      ),
    );
  }
}

commandBus.register(CreateLocationCommand.name, new CreateLocationHandler());
