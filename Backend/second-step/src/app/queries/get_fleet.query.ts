import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { fleetRepository } from '../../infra/fleet.repository';

export class GetFleetQuery {
  constructor(public readonly fleetId: number) {}
}

@QueryHandler(GetFleetQuery)
export class GetFleetHandler implements IQueryHandler<GetFleetQuery> {
  execute(payload: GetFleetQuery) {
    return fleetRepository.findOneById(payload.fleetId);
  }
}
