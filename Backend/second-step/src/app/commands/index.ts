import { CreateFleetHandler } from './create_fleet.comand';
import { CreateLocationHandler } from './create_location.command';
import { CreateVehicleHandler } from './create_vehicle.command';
import { ParkVehicleHandler } from './park_vehicle.command';
import { RegisterVehicleHandler } from './register_vehicle.command';

export const CommandHandlers = [
  CreateFleetHandler,
  CreateLocationHandler,
  CreateVehicleHandler,
  ParkVehicleHandler,
  RegisterVehicleHandler,
];
