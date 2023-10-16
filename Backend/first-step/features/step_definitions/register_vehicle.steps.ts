import * as assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { commandBus, queryBus } from '../../src/app/cqrs';
import { CreateFleetCommand } from '../../src/app/commands/create_fleet.comand';
import { CreateVehicleCommand } from '../../src/app/commands/create_vehicle.command';
import { RegisterVehicleCommand } from '../../src/app/commands/register_vehicle.command';
import { GetFleetQuery } from '../../src/app/queries/get_fleet.query';

Given('my fleet', async function () {
  await commandBus.execute(new CreateFleetCommand('fleet_1', 'user_1'));
});

Given('the fleet of another user', async function () {
  await commandBus.execute(new CreateFleetCommand('fleet_2', 'user_2'));
});

Given('a vehicle', async function () {
  await commandBus.execute(new CreateVehicleCommand('vehicle_1'));
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    await commandBus.execute(
      new RegisterVehicleCommand('vehicle_1', 'fleet_2'),
    );
  },
);

Given('I have registered this vehicle into my fleet', async function () {
  await commandBus.execute(new RegisterVehicleCommand('vehicle_1', 'fleet_1'));
});

When('I register this vehicle into my fleet', async function () {
  await commandBus.execute(new RegisterVehicleCommand('vehicle_1', 'fleet_1'));
});

When('I try to register this vehicle into my fleet', async function () {
  try {
    await commandBus.execute(
      new RegisterVehicleCommand('vehicle_1', 'fleet_1'),
    );
  } catch (error) {
    this.errorMessage = error;
  }
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  await queryBus.execute(new GetFleetQuery('fleet_1'));
});

Then(
  'I should be informed this this vehicle has already been registered into my fleet',
  function () {
    assert(
      this.errorMessage,
      new Error('This vehicle has already been registered into the fleet.'),
    );
  },
);
