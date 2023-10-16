import { fleetRepository } from '../../infra/repository';
import { queryBus, QueryHandler } from '../cqrs';

export class GetFleetQuery {
  constructor(public readonly fleetId: string) {}
}

class GetFleetHandler implements QueryHandler {
  execute(payload: GetFleetQuery) {
    return fleetRepository.findOneById(payload.fleetId);
  }
}

queryBus.register(GetFleetQuery.name, new GetFleetHandler());
