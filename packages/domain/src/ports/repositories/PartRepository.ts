import { Part } from "../../entities/part/Part";

export interface PartRepository {
  getParts(): Promise<Part[] | []>;

  getPart(partId: string): Promise<string | null>;

  addPart(part: Part): Promise<void>;
}
