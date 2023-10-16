import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LocationRepository } from '../../infra/location.repository';

export class GetLocationQuery {
  constructor(public readonly locationId: number) {}
}

@QueryHandler(GetLocationQuery)
export class GetLocationHandler implements IQueryHandler<GetLocationQuery> {
  constructor(private locationRepository: LocationRepository) {}

  async execute(payload: GetLocationQuery) {
    return await this.locationRepository.findOneById(payload.locationId);
  }
}
