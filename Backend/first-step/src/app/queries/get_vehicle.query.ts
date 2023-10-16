import { vehicleRepository } from '../../infra/repository';
import { queryBus, QueryHandler } from '../cqrs';

export class GetVehicleQuery {
  constructor(public readonly vehicleId: string) {}
}

class GetVehicleHandler implements QueryHandler {
  async execute(payload: GetVehicleQuery) {
    return await vehicleRepository.findOneById(payload.vehicleId);
  }
}

queryBus.register(GetVehicleQuery.name, new GetVehicleHandler());
