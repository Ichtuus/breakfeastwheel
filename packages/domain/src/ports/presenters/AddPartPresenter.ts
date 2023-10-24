import { Part } from "../../entities/part/Part";

export enum NewPartFields {
  ownerName = "ownerName",
  creatorName = "creatorName",
  color = "color",

}

export type AddPartErrors = Map<NewPartFields, string>;

export interface AddPartPresentation {
  notifyNewPartInvalid(errors: AddPartErrors): void;
  notifyPartAdded(city: Part): void;
}
