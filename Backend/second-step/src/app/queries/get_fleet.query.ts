import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FleetRepository } from '../../infra/fleet.repository';

export class GetFleetQuery {
  constructor(public readonly fleetId: number) {}
}

@QueryHandler(GetFleetQuery)
export class GetFleetHandler implements IQueryHandler<GetFleetQuery> {
  constructor(private fleetRepository: FleetRepository) {}

  execute(payload: GetFleetQuery) {
    return this.fleetRepository.findOneById(payload.fleetId);
  }
}
