import { Part } from "../../entities/part/Part";

export interface PartRepository {
  getParts(): Promise<{ parts: Part[]; gradiant: string[] } | null>;

  deleteParts(): { parts: []; gradiant: [] };

  getPart(partId: string): Promise<string | null>;

  addPart(part: Part): any;
}
