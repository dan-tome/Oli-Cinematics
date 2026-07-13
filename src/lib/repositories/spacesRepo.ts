import { seedSpaces } from "@/src/data/spaces";
import type { Space } from "@/src/lib/types";

export interface SpacesRepo {
  list(): Promise<Space[]>;
  getById(id: string): Promise<Space | null>;
  getBySlug(slug: string): Promise<Space | null>;
}

class InMemorySpacesRepo implements SpacesRepo {
  private readonly spaces: Space[] = [...seedSpaces];

  async list(): Promise<Space[]> {
    return [...this.spaces];
  }

  async getById(id: string): Promise<Space | null> {
    return this.spaces.find((space) => space.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Space | null> {
    return this.spaces.find((space) => space.slug === slug) ?? null;
  }
}

export const spacesRepo: SpacesRepo = new InMemorySpacesRepo();
