import { Part } from "domain/src/entities/part/Part";

export interface GetPartsPresentation {
  displayParts(parts: { parts: Part[]; gradiant: string[] }): void;
}
