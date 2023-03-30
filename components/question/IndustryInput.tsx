import {
  BtnContainer,
  Error,
  QuestionBoxPara,
  QuestionInputIndustries,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { useSharedStates } from "@/contexts";

export function IndustryInput() {
  const {
    showIndustriesList,
    setShowIndustriesList,
    setErrorMsg,
    errorMsg: error,
    handleOkClick,
  } = useSharedStates();
  const errorMsg = error.industry ?? "";

  return (
    <>
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
          onClick={handleOkClick}
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
    </>
  );
}
