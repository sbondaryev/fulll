import prisma from './prismaClient';
import { Vehicle } from '../domain/vehicle.model';

const toModel = (item) => {
  if (!item) return undefined;

  const { id, plateNumber, parkedLocationId } = item;
  const vehicle = new Vehicle(plateNumber, id);
  vehicle.parkedLocationId = parkedLocationId;
  return vehicle;
};

class VehicleRepository {
  async findOneById(id: number): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();

    return toModel(vehicle);
  }

  async findOneByPlateNumber(plateNumber: string): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plateNumber: plateNumber,
      },
    });
    await prisma.$disconnect();

    return toModel(vehicle);
  }

  async upsert(newVehicle: Vehicle): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.upsert({
      where: {
        plateNumber: newVehicle.plateNumber,
      },
      update: {
        parkedLocationId: newVehicle.parkedLocationId,
        plateNumber: newVehicle.plateNumber,
      },
      create: {
        parkedLocationId: newVehicle.parkedLocationId,
        plateNumber: newVehicle.plateNumber,
      },
    });

    await prisma.$disconnect();
    return toModel(vehicle);
  }

  async getAll(): Promise<Vehicle[]> {
    const vehicles = prisma.vehicle.findMany();
    await prisma.$disconnect();
    return (await vehicles).map(toModel);
  }
}

export const vehicleRepository = new VehicleRepository();
