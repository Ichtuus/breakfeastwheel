import { Part } from "domain/src/entities/part/Part";
import { PartRepository } from "domain/src/ports/repositories/PartRepository";

const key = "ALL_PARTS";

export class PartRepositoryLocalStorage implements PartRepository {
  constructor(private readonly storage: Storage) {}

  async getParts(): Promise<{ parts: Part[]; gradiant: string[] } | null> {
    if (this.storage.length > 0) {
      const parts = JSON.parse(this.storage.getItem(key) as string);

      const gradiant = parts
        .map(
          ({ color }, i) =>
            `${color ? color : "red"} 0 ${
              (100 / parts.length) * (parts.length - i)
            }%`
        )
        .reverse();
      return {
        parts: JSON.parse(this.storage.getItem(key) as string),
        gradiant: gradiant,
      };
    }
    return null;
  }

  async getPart(partId: string): Promise<string | null> {
    const parts = await this.storage.getItem(key);
    return parts;
  }

  addPart(part: Part) {
    if (!this.storage.getItem(key)) {
      this.storage.setItem(key, JSON.stringify([part]));
    }

    const parts = JSON.parse(this.storage.getItem(key) as string);
    const isPartExist = this.checkPartExist(part.id, parts);

    if (!isPartExist) {
      parts.push(part);
      this.storage.setItem(key, JSON.stringify(parts));
    }
  }

  deleteParts(): { parts: []; gradiant: [] } {
    this.storage.clear();
    return { parts: [], gradiant: [] };
  }

  private checkPartExist(partId: string, parts: Part[]): boolean {
    return parts.some((part) => part.id === partId);
  }
}
