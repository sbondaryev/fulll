import { Fleet } from '../domain/fleet.model';
import { Location } from '../domain/location.model';
import { Model } from '../domain/model';
import { Vehicle } from '../domain/vehicle.model';

/*
 * A simple implementation of in-memory database
 */
class Repository<T extends Model> {
  private items: T[] = [];

  async findOneById(id: string): Promise<T> {
    return this.items.find((item) => item.getId() === id) as T;
  }

  async upsert(newItem: T): Promise<T> {
    const isFound = await this.findOneById(newItem.getId());

    this.items = isFound
      ? this.items.map((item) =>
          item.getId() == newItem.getId() ? newItem : item,
        )
      : [newItem, ...this.items];

    return newItem;
  }

  async getAll(): Promise<T[]> {
    return this.items;
  }
}

export const fleetRepository = new Repository<Fleet>();
export const vehicleRepository = new Repository<Vehicle>();
export const locationRepository = new Repository<Location>();
