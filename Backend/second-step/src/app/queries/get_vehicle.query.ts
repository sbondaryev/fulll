import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { vehicleRepository } from '../../infra/vehicle.repository';

export class GetVehicleQuery {
  constructor(public readonly plateNumber: string) {}
}

@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery> {
  async execute(payload: GetVehicleQuery) {
    return await vehicleRepository.findOneByPlateNumber(payload.plateNumber);
  }
}
