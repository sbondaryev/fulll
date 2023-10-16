import { CommandBus } from '@nestjs/cqrs';
import { Command, CommandRunner } from 'nest-commander';
import { CreateFleetCommand } from './app/commands/create_fleet.comand';
import { CreateVehicleCommand } from './app/commands/create_vehicle.command';
import { RegisterVehicleCommand } from './app/commands/register_vehicle.command';
import { ParkVehicleCommand } from './app/commands/park_vehicle.command';

@Command({
  name: 'create',
  arguments: '<userId>',
  description: 'Create a fleet',
})
export class CreateFleetCLI extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    const userId = Number(passedParam[0]);
    const fleet = await this.commandBus.execute(new CreateFleetCommand(userId));

    console.log(fleet);
  }
}

@Command({
  name: 'register-vehicle',
  arguments: '<fleetId> <vehiclePlateNumber>',
  description: 'Registre a vehicle',
})
export class RegisterVehicleCLI extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    const fleetId = Number(passedParam[0]);
    const plateNumber = passedParam[1];
    const vehicle = await this.commandBus.execute(
      new CreateVehicleCommand(plateNumber),
    );
    const fleet = await this.commandBus.execute(
      new RegisterVehicleCommand(vehicle.id, fleetId),
    );

    console.log(fleet);
  }
}

@Command({
  name: 'localize-vehicle',
  arguments: '<fleetId> <vehiclePlateNumber> <latitude> <longitude>',
  description: 'Localize a vehicle',
})
export class LocalizeVehicleCLI extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    //const fleedId = passedParam[0];
    const plateNumber = passedParam[1];
    const latitude = Number(passedParam[2]);
    const longitude = Number(passedParam[3]);

    const location = await this.commandBus.execute(
      new ParkVehicleCommand(plateNumber, latitude, longitude),
    );

    console.log(location);
  }
}
