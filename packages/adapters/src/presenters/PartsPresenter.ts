import { GetPartsPresentation, Part } from "@breakfeastwheel-domain";
import { Presenter } from "./Presenter";

export class PartsPresenterVM {
  data: { parts: Part[], gradiant: string[] } | undefined;
}

export class PartsPresenter
  extends Presenter<PartsPresenterVM>
  implements GetPartsPresentation
{
  constructor() {
    super(new PartsPresenterVM());
  }

  displayParts(data: {parts: Part[], gradiant: string[] }): void {
    this.vm.data = data;
    this.notifyVM();
  }
}
