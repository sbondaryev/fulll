import * as assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Coordinates, Location } from '../../src/domain/location.model';
import { commandBus, queryBus } from '../../src/app/cqrs';
import { CreateLocationCommand } from '../../src/app/commands/create_location.command';
import { ParkVehicleCommand } from '../../src/app/commands/park_vehicle.command';
import { GetLocationQuery } from '../../src/app/queries/get_location.query';

Given('a location', async function () {
  this.coordinates = new Coordinates(37.7749, -122.4194);
  await commandBus.execute(
    new CreateLocationCommand(
      'location_1',
      this.coordinates.latitude,
      this.coordinates.longitude,
    ),
  );
});

Given('my vehicle has been parked into this location', async function () {
  await commandBus.execute(
    new ParkVehicleCommand(
      'vehicle_1',
      'location_1',
      this.coordinates.latitude,
      this.coordinates.longitude,
    ),
  );
});

When(
  'I try to park my vehicle with gps coordinates {float}, {float} at this location',
  async function (latitude: number, longitude: number) {
    try {
      await commandBus.execute(
        new ParkVehicleCommand('vehicle_1', 'location_1', latitude, longitude),
      );
    } catch {
      /* EMPTY */
    }
  },
);

Then(
  'the known location of my vehicle should {string} this location',
  async function (verify: string) {
    const location = (await queryBus.execute(
      new GetLocationQuery('location_1'),
    )) as Location;
    assert.strictEqual(location.isHold(), verify == 'true');
  },
);

When('I try to park my vehicle at this location', async function () {
  try {
    await commandBus.execute(
      new ParkVehicleCommand(
        'vehicle_1',
        'location_1',
        this.coordinates.latitude,
        this.coordinates.longitude,
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
