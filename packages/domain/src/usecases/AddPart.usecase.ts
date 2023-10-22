import { PartBuilder } from "../entities/part/PartBuilder";
import {
  AddPartPresentation,
  NewPartFields,
} from "../ports/presenters/AddPartPresentation.presenter";
import { PartRepository } from "../ports/repositories/Part.repository";
import { AddPartRequest } from "../ports/requests/AddPartRequest";

export class AddPartUseCase {
  constructor(private partRepository: PartRepository) {}

  async execute(
    addPartRequest: AddPartRequest,
    presenter: AddPartPresentation
  ) {
    const errors = this.validate(addPartRequest, presenter);

    if (!errors.size) {
      const part = new PartBuilder()
        .withOwnerName(addPartRequest.ownerName)
        .withCreatorName(addPartRequest.creatorName)
        .build();

      await this.partRepository.addPart(part);
      presenter.notifyPartAdded(part);
    }
  }

  validate(addPartRequest: AddPartRequest, presenter: AddPartPresentation) {
    const errors = new Map<NewPartFields, string>();
    if (addPartRequest.ownerName == null || !addPartRequest.ownerName.length) {
      errors.set(NewPartFields.ownerName, "Owner name is required");
    }

    if (
      addPartRequest.creatorName == null ||
      !addPartRequest.creatorName.length
    ) {
      errors.set(NewPartFields.creatorName, "Creator name is required");
    }

    presenter.notifyNewPartInvalid(errors);
    return errors;
  }
}
