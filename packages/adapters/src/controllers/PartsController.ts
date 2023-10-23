import { GetPartsUseCase } from "@breakfeastwheel-domain";
import { PartsPresenter, PartsPresenterVM } from "../presenters/PartsPresenter";
import { Controller } from "./Controller";

export class PartsController extends Controller<PartsPresenterVM> {
  constructor(
    private readonly getPartsUseCase: GetPartsUseCase,
    private readonly presenter: PartsPresenter
  ) {
    console.log("c la merde");
    super(presenter);
  }

  fetchParts() {
    console.log("YOOOOO");
    this.getPartsUseCase.execute(this.presenter);
  }
}
