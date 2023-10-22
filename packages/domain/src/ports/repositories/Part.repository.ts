import { Part } from "domain/src/entities/part/Part";

export interface PartRepository {
  getParts(): Promise<Part[] | null>;

  getPart(partId: string): Promise<Part>;

  addPart(part: Part): Promise<void>;
}
