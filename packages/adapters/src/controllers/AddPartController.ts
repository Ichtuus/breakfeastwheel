import {
  AddPartPresenter,
  AddPartPresenterVM,
} from "../presenters/AddPartPresenter";
import { AddPartUseCase, AddPartRequest } from "../../../domain/src/index";

import { Controller } from "./Controller";

export class AddPartController extends Controller<AddPartPresenterVM> {
  constructor(
    private addPartUseCase: AddPartUseCase,
    private presenter: AddPartPresenter
  ) {
    super(presenter);
  }

  validateOwnerName(ownerName: string) {
    this.presenter.vm.ownerName = ownerName;
    this.presenter.vm.ownerNameTouched = true;
    this.validate();
  }

  validateCreatorName(creatorName: string) {
    this.presenter.vm.creatorName = creatorName;
    this.presenter.vm.creatorNameTouched = true;
    this.validate();
  }

  validateColor(color: string) {
    console.log("la couleur", color);
    this.presenter.vm.color = color;
    this.presenter.vm.colorTouched = true;
    this.validate();
  }

  create() {
    this.addPartUseCase.execute(
      new AddPartRequest(
        this.presenter.vm.ownerName || "",
        this.presenter.vm.creatorName || "",
        this.presenter.vm.color || ""
      ),
      this.presenter
    );
  }

  private validate() {
    this.addPartUseCase.validate(
      new AddPartRequest(
        this.presenter.vm.ownerName || "",
        this.presenter.vm.creatorName || "",
        this.presenter.vm.color || ""
      ),
      this.presenter
    );
  }
}
