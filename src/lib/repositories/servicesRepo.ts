import { seedServices } from "@/src/data/services";
import type { Service } from "@/src/lib/types";

export interface ServicesRepo {
  list(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
}

class InMemoryServicesRepo implements ServicesRepo {
  private readonly services: Service[] = [...seedServices];

  async list(): Promise<Service[]> {
    return [...this.services];
  }

  async getById(id: string): Promise<Service | null> {
    return this.services.find((service) => service.id === id) ?? null;
  }
}

export const servicesRepo: ServicesRepo = new InMemoryServicesRepo();
