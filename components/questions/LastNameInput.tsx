import { SET_LAST_NAME } from "@/reducers";
import { ChangeEventHandler, useEffect, useRef } from "react";
import {
  BtnContainer,
  Error,
  QuestionBox,
  QuestionInputText,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Questions.module.css";
import Image from "next/image";
import { useQuestions } from "@/contexts";
import { QuestionProps } from "@/types";

export function LastNameInput({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  errorMsg,
  setErrorMsg,
}: QuestionProps) {
  const { state, dispatch } = useQuestions();
  const { firstName, lastName } = state;
  const inputTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTextRef.current?.focus();
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.lastNamae;
        return prevValue;
      });
    dispatch({ type: SET_LAST_NAME, payload: event.target.value });
  };

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
      <QuestionNumHeading questionNum={2}>
        and your last name, {firstName}? *
      </QuestionNumHeading>

      <QuestionInputText
        placeholder="Type your answer here..."
        value={lastName}
        onChange={handleInputChange}
        ref={inputTextRef}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={true}
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
