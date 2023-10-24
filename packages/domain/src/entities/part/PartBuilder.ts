import { generateUniqueId } from "../../utils";
import { Part } from "./Part";

export class PartBuilder {
  private ownerName!: string;
  private creatorName!: string;
  private color!: string;

  withOwnerName(ownerName: string) {
    this.ownerName = ownerName;
    return this;
  }

  withCreatorName(creatorName: string) {
    this.creatorName = creatorName;
    return this;
  }

  withColor(color: string) {
    this.color = color;
    return this;
  }

  build(): Part {
    return {
      id: generateUniqueId(),
      owner: this.ownerName,
      creator: this.creatorName,
      color: this.color
    };
  }

  static example() {
    return new PartBuilder()
      .withColor('hsl(140 36% 74%)')
      .withOwnerName("Luffy")
      .withCreatorName("Eichiro Oda");
  }
}
