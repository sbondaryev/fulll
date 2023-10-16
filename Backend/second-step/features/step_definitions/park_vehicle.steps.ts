import * as assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { CreateLocationCommand } from '../../src/app/commands/create_location.command';
import { ParkVehicleCommand } from '../../src/app/commands/park_vehicle.command';
import { commandBus } from './before_all';

const coordinates = { latitude: 37.7749, longitude: -122.4194 };

Given('a location', async function () {
  this.location = await commandBus.execute(
    new CreateLocationCommand(coordinates.latitude, coordinates.longitude),
  );
});

Given('my vehicle has been parked into this location', async function () {
  await commandBus.execute(
    new ParkVehicleCommand(
      this.vehicle.plateNumber,
      this.location.latitude,
      this.location.longitude,
    ),
  );
});

When('I park my vehicle at this location', async function () {
  this.newLocation = await commandBus.execute(
    new ParkVehicleCommand(
      this.vehicle.plateNumber,
      coordinates.latitude,
      coordinates.longitude,
    ),
  );
});

Then(
  'the known location of my vehicle should verify this location',
  async function () {
    assert.strictEqual(this.newLocation.id, this.location.id);
  },
);

When('I try to park my vehicle at this location', async function () {
  try {
    await commandBus.execute(
      new ParkVehicleCommand(
        this.vehicle.plateNumber,
        this.location.latitude,
        this.location.longitude,
      ),
    );
  } catch (error) {
    this.errorMessage = error;
  }
});

Then(
  'I should be informed that my vehicle is already parked at this location',
  function () {
    assert(
      this.errorMessage,
      new Error('A vehicle is already parked at this location.'),
    );
  },
);
