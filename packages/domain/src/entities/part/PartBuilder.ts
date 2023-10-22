import { generateUniqueId } from "../../utils";
import { Part } from "./Part";

export class PartBuilder {
  private ownerName!: string;
  private creatorName!: string;

  withOwnerName(ownerName: string) {
    this.ownerName = ownerName;
    return this;
  }

  withCreatorName(creatorName: string) {
    this.creatorName = creatorName;
    return this;
  }

  build(): Part {
    return {
      id: generateUniqueId(),
      owner: this.ownerName,
      creator: this.creatorName,
    };
  }

  static example() {
    return new PartBuilder()
      .withOwnerName("Luffy")
      .withCreatorName("Eichiro Oda");
  }
}
