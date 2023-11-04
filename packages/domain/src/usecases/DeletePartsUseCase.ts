import { GetPartsPresentation } from "../ports/presenters/GetPartsPresenter";
import { PartRepository } from "../ports/repositories/PartRepository";

export class DeletePartsUseCase {
  constructor(private partRepository: PartRepository) {}

  async execute(presentation: GetPartsPresentation) {
    const data = await this.partRepository.deleteParts();
    console.log("s    rt", data);
    presentation.displayParts({ parts: data.parts, gradiant: data.gradiant });
  }
}
