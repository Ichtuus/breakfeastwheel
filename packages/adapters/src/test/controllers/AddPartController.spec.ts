import {
  AddPartPresentation,
  AddPartRequest,
  NewPartFields,
} from "../../../../domain/src";
import { AddPartUseCaseBuilder } from "../builder/AddPartUseCaseBuilder";
import { AddPartController } from "../../controllers/AddPartController";
import { AddPartPresenter } from "../../presenters/AddPartPresenter";

describe("AddPartController", () => {
  it("display error on owner name", () => {
    const useCase = new AddPartUseCaseBuilder()
      .withValidate(
        (addPartRequest: AddPartRequest, presenter: AddPartPresentation) => {
          const errors = new Map<NewPartFields, string>();
          errors.set(NewPartFields.ownerName, "Owner name is required");
          presenter.notifyNewPartInvalid(errors);
          return errors;
        }
      )
      .build();

    const controller = new AddPartController(useCase, new AddPartPresenter());

    controller.validateOwnerName("");

    expect(controller.vm.ownerName).toBe("");
    expect(controller.vm.ownerNameError).toBe("Owner name is required");
    expect(controller.vm.ownerNameTouched).toBeTruthy();
    expect(controller.vm.canCreatePart).toBeFalsy();
  });

  it("display error on creator name", () => {
    const useCase = new AddPartUseCaseBuilder()
      .withValidate(
        (addPartRequest: AddPartRequest, presenter: AddPartPresentation) => {
          const errors = new Map<NewPartFields, string>();
          errors.set(NewPartFields.creatorName, "Creator name is required");
          presenter.notifyNewPartInvalid(errors);
          return errors;
        }
      )
      .build();

    const controller = new AddPartController(useCase, new AddPartPresenter());

    controller.validateCreatorName("");

    expect(controller.vm.creatorName).toBe("");
    expect(controller.vm.creatorNameError).toBe("Creator name is required");
    expect(controller.vm.creatorNameTouched).toBeTruthy();
    expect(controller.vm.canCreatePart).toBeFalsy();
  });

  it("display error on color", () => {
    const useCase = new AddPartUseCaseBuilder()
      .withValidate(
        (addPartRequest: AddPartRequest, presenter: AddPartPresentation) => {
          const errors = new Map<NewPartFields, string>();
          errors.set(NewPartFields.color, "Color is required");
          presenter.notifyNewPartInvalid(errors);
          return errors;
        }
      )
      .build();

    const controller = new AddPartController(useCase, new AddPartPresenter());

    controller.validateColor("");

    expect(controller.vm.color).toBe("");
    expect(controller.vm.colorError).toBe("Color is required");
    expect(controller.vm.colorTouched).toBeTruthy();
    expect(controller.vm.canCreatePart).toBeFalsy();
  });

  it("display part error on create", () => {
    const useCase = new AddPartUseCaseBuilder()
      .withExecute(
        (addCityRequest: AddPartRequest, presenter: AddPartPresentation) => {
          const errors = new Map<NewPartFields, string>();
          errors.set(NewPartFields.ownerName, "Owner name required");
          errors.set(NewPartFields.creatorName, "Creator name is required");
          errors.set(NewPartFields.color, "Color is required");
          presenter.notifyNewPartInvalid(errors);
          return Promise.resolve();
        }
      )
      .build();
    const controller = new AddPartController(useCase, new AddPartPresenter());

    // When
    controller.create();

    // Then
    expect(controller.vm.canCreatePart).toBeFalsy();
  });
});
