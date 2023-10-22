import { GetPartsUseCase } from "domain/src/usecases/GetParts.usecase";
import { PartsController } from "./Parts.controller";
import { PartsPresenter } from "../presenters/Parts.presenter";

export class PartsControllerFactory {
  constructor(private getPartsUseCase: GetPartsUseCase) {}

  build(): PartsController {
    return new PartsController(this.getPartsUseCase, new PartsPresenter());
  }
}
