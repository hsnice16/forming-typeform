import {
  BtnContainer,
  QuestionBox,
  QuestionBoxHeading,
  QuestionBoxPara,
} from "../index";
import classNames from "classnames";
import styles from "./Questions.module.css";

export type QuestionProps = {
  readonly inView?: boolean;
  readonly inViewSlide?: "up" | "down" | "";
  readonly outView?: boolean;
  readonly outViewSlide?: "up" | "down" | "";
};

export function QuestionZero({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
}: QuestionProps) {
  return (
    <QuestionBox
      className={classNames({
        [styles["slide-out"]]: outView,
        [styles["slide-in"]]: inView,
        [styles["out-view__up"]]: outViewSlide === "up",
        [styles["out-view__down"]]: outViewSlide === "down",
        [styles["in-view__up"]]: inViewSlide === "up",
        [styles["in-view__down"]]: inViewSlide === "down",
      })}
    >
      <QuestionBoxHeading>
        Up-skilling requires time commitment
      </QuestionBoxHeading>
      <QuestionBoxPara>
        The GrowthX experience is designed by keeping in mind the working hours
        founders &amp; full time operators typically work in.
        <br />
        <br />
        You will spend
        <br />- 6 hours/week for the first 5 weeks
        <br />- 15 hours/week for the last 3 weeks
      </QuestionBoxPara>
      <BtnContainer showPressEnter={true}>I agree</BtnContainer>
    </QuestionBox>
  );
}
