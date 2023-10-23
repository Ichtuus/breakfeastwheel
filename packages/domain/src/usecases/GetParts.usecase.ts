import { GetPartsPresentation } from "../ports/presenters/GetPartsPresenter";
import { PartRepository } from "../ports/repositories/PartRepository";

export class GetPartsUseCase {
  constructor(private partRepository: PartRepository) {}

  async execute(presentation: GetPartsPresentation) {
    const parts = await this.partRepository.getParts();
    if (parts) {
      presentation.displayParts(parts);
    }
  }
}
