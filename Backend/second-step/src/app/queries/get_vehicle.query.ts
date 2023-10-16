import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VehicleRepository } from '../../infra/vehicle.repository';

export class GetVehicleQuery {
  constructor(public readonly plateNumber: string) {}
}

@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery> {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(payload: GetVehicleQuery) {
    return await this.vehicleRepository.findOneByPlateNumber(
      payload.plateNumber,
    );
  }
}
