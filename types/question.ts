import { Dispatch, SetStateAction } from "react";

export type QuestionProps = {
  readonly inView: boolean;
  readonly inViewSlide: "up" | "down" | "";
  readonly outView: boolean;
  readonly outViewSlide: "up" | "down" | "";
  readonly isRendered?: boolean;
  readonly type:
    | "intro"
    | "firstName"
    | "lastName"
    | "industry"
    | "role"
    | "goal"
    | "email";
};

export type IndustriesProps = {
  readonly showIndustriesList: boolean;
  readonly setShowIndustriesList: Dispatch<SetStateAction<boolean>>;
};
