import { locationRepository } from '../../infra/repository';
import { queryBus, QueryHandler } from '../cqrs';

export class GetLocationQuery {
  constructor(public readonly locationId: string) {}
}

class GetLocationHandler implements QueryHandler {
  async execute(payload: GetLocationQuery) {
    return await locationRepository.findOneById(payload.locationId);
  }
}

queryBus.register(GetLocationQuery.name, new GetLocationHandler());
