import {
  BtnContainer,
  QuestionBox,
  QuestionInputText,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Questions.module.css";
import Image from "next/image";
import { QuestionsProps } from "./QuestionZero";

export function QuestionOne({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
}: QuestionsProps) {
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
      <QuestionNumHeading />
      <QuestionInputText />
      <BtnContainer
        className={classNames(styles["btn-container"], styles["ok"])}
      >
        OK{" "}
        <Image
          src="/check-small.svg"
          alt="check small"
          width={34}
          height={34}
        />
      </BtnContainer>
    </QuestionBox>
  );
}
