import {
  BtnContainer,
  Error,
  QuestionBox,
  QuestionBoxPara,
  QuestionInputIndustries,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Questions.module.css";
import Image from "next/image";
import { IndustriesProps, QuestionProps } from "@/types";

type IndustryInputProps = QuestionProps & IndustriesProps;

export function IndustryInput({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  showIndustriesList,
  setShowIndustriesList,
  errorMsg,
  setErrorMsg,
}: IndustryInputProps) {
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
      <QuestionNumHeading questionNum={3}>
        What industry is your company in? *
      </QuestionNumHeading>

      <QuestionBoxPara>
        We will personalize your learning experience accordingly
      </QuestionBoxPara>

      <QuestionInputIndustries
        showIndustriesList={showIndustriesList}
        setShowIndustriesList={setShowIndustriesList}
        setErrorMsg={setErrorMsg}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={false}
        >
          OK{" "}
          <Image
            src="/check-small.svg"
            alt="check small"
            width={34}
            height={34}
          />
        </BtnContainer>
      )}
    </QuestionBox>
  );
}
