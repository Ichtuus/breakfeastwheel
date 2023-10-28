import { AddPartUseCase } from "../../../../domain/src/index";
import { AddPartController } from "../AddPartController";
import { AddPartPresenter } from "../../presenters/AddPartPresenter";

export class AddPartControllerFactory {
  constructor(private addNewPartUseCase: AddPartUseCase) {}

  build(): AddPartController {
    return new AddPartController(
      this.addNewPartUseCase,
      new AddPartPresenter()
    );
  }
}
