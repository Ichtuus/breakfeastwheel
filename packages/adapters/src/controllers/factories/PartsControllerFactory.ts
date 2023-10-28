import { GetPartsUseCase } from "domain/src/usecases/GetPartsUsecase";
import { PartsController } from "../PartsController";
import { PartsPresenter } from "../../presenters/PartsPresenter";

export class PartsControllerFactory {
  constructor(private getPartsUseCase: GetPartsUseCase) {}

  build(): PartsController {
    console.log("BUILD parts controller");
    return new PartsController(this.getPartsUseCase, new PartsPresenter());
  }
}
