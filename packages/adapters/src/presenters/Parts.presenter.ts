import { GetPartsPresentation, Part } from "@breakfeastwheel/domain";
import { Presenter } from "./Presenter";

export class PartsPresenterVM {
  parts: Part[] | undefined;
}

export class PartsPresenter
  extends Presenter<PartsPresenterVM>
  implements GetPartsPresentation
{
  constructor() {
    super(new PartsPresenterVM());
  }

  displayParts(parts: Part[]): void {
    this.vm.parts = parts;
    this.notifyVM();
  }
}
