import { Presenter } from "./Presenter";
import {
  AddPartPresentation,
  AddPartErrors,
  NewPartFields,
} from "../../../domain/src/index";

export class AddPartPresenterVM {
  ownerNameError: string | undefined;
  ownerName: string | undefined;
  ownerNameTouched = false;
  creatorNameError: string | undefined;
  creatorName: string | undefined;
  creatorNameTouched = false;
  color: string | undefined;
  colorTouched = false;
  colorError: string | undefined;
  canCreatePart = false;
}

export class AddPartPresenter
  extends Presenter<AddPartPresenterVM>
  implements AddPartPresentation
{
  constructor() {
    super(new AddPartPresenterVM());
  }

  notifyPartAdded(): void {
    this.notifyVM();
  }

  notifyNewPartInvalid(errors: AddPartErrors): void {
    this.vm.ownerNameError = this.vm.ownerNameTouched
      ? errors.get(NewPartFields.ownerName)
      : "";

    this.vm.creatorNameError = this.vm.creatorNameTouched
      ? errors.get(NewPartFields.creatorName)
      : "";

    this.vm.colorError = this.vm.colorTouched
      ? errors.get(NewPartFields.color)
      : "";

    console.log(
      "sez",
      errors.size
    );
    this.vm.canCreatePart = errors.size == 0;
    this.notifyVM();
  }
}
