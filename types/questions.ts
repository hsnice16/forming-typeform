import { Dispatch, SetStateAction } from "react";
import { ObjectType } from "./misc";

export type QuestionProps = {
  readonly inView?: boolean;
  readonly inViewSlide?: "up" | "down" | "";
  readonly outView?: boolean;
  readonly outViewSlide?: "up" | "down" | "";
  readonly errorMsg?: string;
  readonly setErrorMsg?: Dispatch<SetStateAction<ObjectType>>;
};

export type IndustriesProps = {
  showIndustriesList: boolean;
  setShowIndustriesList: Dispatch<SetStateAction<boolean>>;
};
