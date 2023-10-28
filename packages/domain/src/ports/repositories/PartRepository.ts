import { Part } from "../../entities/part/Part";

export interface PartRepository {
  getParts(): Promise<{ parts: Part[]; gradiant: string[] } | null>;

  getPart(partId: string): Promise<string | null>;

  addPart(part: Part): any;
}
