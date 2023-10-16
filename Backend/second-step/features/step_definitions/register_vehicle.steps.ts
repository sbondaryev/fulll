import * as assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { CreateFleetCommand } from '../../src/app/commands/create_fleet.comand';
import { CreateVehicleCommand } from '../../src/app/commands/create_vehicle.command';
import { RegisterVehicleCommand } from '../../src/app/commands/register_vehicle.command';
import { GetFleetQuery } from '../../src/app/queries/get_fleet.query';
import { commandBus, queryBus } from './before_all';

const userId = 1;
const anotherUserId = 2;
const plateNumber = 'HF-990-TT';

Given('my fleet', async function () {
  this.myFleet = await commandBus.execute(new CreateFleetCommand(userId));
});

Given('the fleet of another user', async function () {
  this.anotherFleet = await commandBus.execute(
    new CreateFleetCommand(anotherUserId),
  );
});

Given('a vehicle', async function () {
  this.vehicle = await commandBus.execute(
    new CreateVehicleCommand(plateNumber),
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    await commandBus.execute(
      new RegisterVehicleCommand(
        this.vehicle.id,
        this.anotherFleet.id,
      ),
    );
  },
);

Given('I have registered this vehicle into my fleet', async function () {
  await commandBus.execute(
    new RegisterVehicleCommand(this.vehicle.id, this.myFleet.id),
  );
});

When('I register this vehicle into my fleet', async function () {
  await commandBus.execute(
    new RegisterVehicleCommand(this.vehicle.id, this.myFleet.id),
  );
});

When('I try to register this vehicle into my fleet', async function () {
  try {
    await commandBus.execute(
      new RegisterVehicleCommand(this.vehicle.id, this.myFleet.id),
    );
  } catch (error) {
    this.errorMessage = error;
  }
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  const fleet = await queryBus.execute(new GetFleetQuery(this.myFleet.id));
  assert.strictEqual(
    fleet.getRegistrations().includes(this.vehicle.id),
    true,
  );
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
