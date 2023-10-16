import prisma from './prismaClient';
import { Fleet } from '../domain/fleet.model';

const toModel = (item) => {
  if (!item) return undefined;

  const { userId, id, vehicles = '[]' } = item;
  const fleet = new Fleet(userId, id);
  fleet.setRegistrations(JSON.parse(vehicles));

  return fleet;
};

class FleetRepository {
  async findOneById(id: number): Promise<Fleet> {
    const fleet = await prisma.fleet.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();

    return toModel(fleet);
  }

  async upsert(newFleet: Fleet): Promise<Fleet> {
    const fleet = await prisma.fleet.upsert({
      where: {
        id: newFleet.id,
      },
      update: {
        userId: newFleet.userId,
        vehicles: JSON.stringify(newFleet.getRegistrations()),
      },
      create: {
        userId: newFleet.userId,
        vehicles: JSON.stringify(newFleet.getRegistrations()),
      },
    });

    await prisma.$disconnect();
    return toModel(fleet);
  }

  async getAll(): Promise<Fleet[]> {
    const fleets = prisma.fleet.findMany();
    await prisma.$disconnect();
    return (await fleets).map(toModel);
  }
}

export const fleetRepository = new FleetRepository();
