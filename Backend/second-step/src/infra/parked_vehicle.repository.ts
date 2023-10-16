import { Injectable } from '@nestjs/common';
import prisma from './prismaClient';

@Injectable()
export class ParkedRepository {
  async isVehicleParked(vehicleId: number): Promise<boolean> {
    const item = await prisma.parkedVehicle.findUnique({
      where: {
        vehicleId: vehicleId,
      },
    });
    await prisma.$disconnect();

    return Boolean(item);
  }

  async isLocationTaken(locationId: number): Promise<boolean> {
    const item = await prisma.parkedVehicle.findUnique({
      where: {
        locationId: locationId,
      },
    });
    await prisma.$disconnect();

    return Boolean(item);
  }

  async parkVehicle(vehicleId: number, locationId: number): Promise<void> {
    if (await this.isLocationTaken(locationId)) {
      throw Error('A vehicle is already parked at this location.');
    }

    await prisma.parkedVehicle.upsert({
      where: {
        vehicleId: vehicleId,
      },
      update: {
        locationId: locationId,
      },
      create: {
        locationId: locationId,
        vehicleId: vehicleId,
      },
    });

    await prisma.$disconnect();
  }

  async deleteAllItems(): Promise<void> {
    await prisma.parkedVehicle.deleteMany({});
    await prisma.$disconnect();
  }
}
