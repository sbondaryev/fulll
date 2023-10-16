import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { locationRepository } from '../../infra/location.repository';

export class GetLocationQuery {
  constructor(public readonly locationId: number) {}
}

@QueryHandler(GetLocationQuery)
export class GetLocationHandler implements IQueryHandler<GetLocationQuery> {
  async execute(payload: GetLocationQuery) {
    return await locationRepository.findOneById(payload.locationId);
  }
}
