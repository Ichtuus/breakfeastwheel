import { GetPartsUseCase } from "domain/src/usecases/GetPartsUsecase";
import { PartsController } from "../PartsController";
import { PartsPresenter } from "../../presenters/PartsPresenter";
import { DeletePartsUseCase } from "@breakfeastwheel-domain";

export class PartsControllerFactory {
  constructor(
    private getPartsUseCase: GetPartsUseCase,
    private deletePartsUseCase: DeletePartsUseCase
  ) {}

  build(): PartsController {
    console.log("BUILD parts controller", this.deletePartsUseCase);
    return new PartsController(
      this.getPartsUseCase,
      this.deletePartsUseCase,
      new PartsPresenter()
    );
  }
}
