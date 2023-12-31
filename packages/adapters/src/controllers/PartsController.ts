import { GetPartsUseCase, DeletePartsUseCase } from "@breakfeastwheel-domain";
import { PartsPresenter, PartsPresenterVM } from "../presenters/PartsPresenter";
import { Controller } from "./Controller";

export class PartsController extends Controller<PartsPresenterVM> {
  constructor(
    private readonly getPartsUseCase: GetPartsUseCase,
    private readonly deletePartsUseCase: DeletePartsUseCase,
    private readonly presenter: PartsPresenter
  ) {
    super(presenter);
  }

  fetchParts() {
    this.getPartsUseCase.execute(this.presenter);
  }

  deleteParts() {
    this.deletePartsUseCase.execute(this.presenter);
  }
}
