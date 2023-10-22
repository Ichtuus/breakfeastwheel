import { GetPartsPresentation } from "../ports/presenters/GetPartsPresentation.presenter";
import { PartRepository } from "../ports/repositories/Part.repository";

export class GetPartsUseCase {
  constructor(private partRepository: PartRepository) {}

  async execute(presentation: GetPartsPresentation) {
    const parts = await this.partRepository.getParts();
    if (parts) {
      presentation.displayParts(parts);
    }
  }
}
