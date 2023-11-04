import {
  AddPartErrors,
  AddPartPresentation,
  NewPartFields,
  AddPartUseCase,
  AddPartRequest,
} from "../../../../domain/src";

export class AddPartUseCaseBuilder {
  private execute: (
    addCityRequest: AddPartRequest,
    presenter: AddPartPresentation
  ) => Promise<void> = () => Promise.resolve();
  private validate: (
    addPartRequest: AddPartRequest,
    presenter: AddPartPresentation
  ) => AddPartErrors = () => new Map<NewPartFields, string>();

  withExecute(
    execute: (
      addPartRequest: AddPartRequest,
      presenter: AddPartPresentation
    ) => Promise<void>
  ) {
    this.execute = execute;
    return this;
  }

  withValidate(
    validate: (
      addPartRequest: AddPartRequest,
      presenter: AddPartPresentation
    ) => AddPartErrors
  ) {
    this.validate = validate;
    return this;
  }

  build(): AddPartUseCase {
    return {
      execute: this.execute,
      validate: this.validate,
    } as AddPartUseCase;
  }
}
