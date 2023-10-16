import prisma from './prismaClient';
import { Location } from '../domain/location.model';

const toModel = (item) => {
  if (!item) return undefined;

  const { id, latitude, longitude, placedVehicleId } = item;
  const location = new Location(latitude, longitude, id);
  placedVehicleId && location.hold(placedVehicleId);
  return location;
};

class LocationRepository {
  async findOneById(id: number): Promise<Location> {
    const location = await prisma.location.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();

    return toModel(location);
  }

  async findOneByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<Location> {
    const location = await prisma.location.findUnique({
      where: {
        latitude_longitude: {
          latitude: latitude,
          longitude: longitude,
        },
      },
    });
    await prisma.$disconnect();

    return toModel(location);
  }

  async upsert(newLocation: Location): Promise<Location> {
    const location = await prisma.location.upsert({
      where: {
        latitude_longitude: {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        },
      },
      update: {
        placedVehicleId: newLocation.placedVehicleId,
      },
      create: {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        placedVehicleId: newLocation.placedVehicleId,
      },
    });

    await prisma.$disconnect();
    return toModel(location);
  }

  async getAll(): Promise<Location[]> {
    const locations = prisma.location.findMany();
    await prisma.$disconnect();
    return (await locations).map(toModel);
  }
}

export const locationRepository = new LocationRepository();
