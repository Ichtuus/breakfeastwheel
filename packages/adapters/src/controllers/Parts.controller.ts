import { GetPartsUseCase } from "@breakfeastwheel/domain";
import {
  PartsPresenter,
  PartsPresenterVM,
} from "../presenters/Parts.presenter";
import { Controller } from "./Controller";

export class PartsController extends Controller<PartsPresenterVM> {
  constructor(
    private readonly getPartsUseCase: GetPartsUseCase,
    private readonly presenter: PartsPresenter
  ) {
    super(presenter);
  }

  fetchParts() {
    this.getPartsUseCase.execute(this.presenter);
  }
}
