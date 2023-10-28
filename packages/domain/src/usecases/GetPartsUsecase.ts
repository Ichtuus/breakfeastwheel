import { GetPartsPresentation } from "../ports/presenters/GetPartsPresenter";
import { PartRepository } from "../ports/repositories/PartRepository";

export class GetPartsUseCase {
  constructor(private partRepository: PartRepository) {}

  async execute(presentation: GetPartsPresentation) {
    const data = await this.partRepository.getParts();
    if (data) {
      presentation.displayParts({parts: data.parts, gradiant: data.gradiant});
    }
  }
}
