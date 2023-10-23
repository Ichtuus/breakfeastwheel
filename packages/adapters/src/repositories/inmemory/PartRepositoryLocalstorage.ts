import { Part } from "domain/src/entities/part/Part";
import { PartRepository } from "domain/src/ports/repositories/PartRepository";

const key = "ALL_PARTS";

export class PartRepositoryLocalStorage implements PartRepository {
  constructor(private readonly storage: Storage) {}

  getParts(): Promise<Part[] | null> {
    return Promise.resolve(this.storage.getItem(key) as Part[] | null);
  }

  getPart(partId: string): Promise<Part> {
    const parts = Promise.resolve(this.storage.getItem(key) as Part[] | null);
    console.log("PARTS", parts);
    return parts as any;
  }

  addPart(part: Part): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
