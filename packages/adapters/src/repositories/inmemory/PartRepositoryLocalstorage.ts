import { Part } from "domain/src/entities/part/Part";
import { PartRepository } from "domain/src/ports/repositories/PartRepository";

const key = "ALL_PARTS";

export class PartRepositoryLocalStorage implements PartRepository {
  constructor(private readonly storage: Storage) {}

  async getParts(): Promise<Part[] | []> {
    if (this.storage.length > 0) {
      return JSON.parse(this.storage.getItem(key) as string);
    }
    return []
  }

  async getPart(partId: string): Promise<string | null> {
    const parts = await this.storage.getItem(key);
    return parts;
  }

  addPart(part: Part): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
