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
import { ChangeEventHandler, useEffect, useRef } from "react";
import { SET_FIRST_NAME } from "@/reducers";
import { useQuestions } from "@/contexts";
import { QuestionProps } from "@/types";

export function FirstNameInput({
  inView,
  inViewSlide,
  outView,
  outViewSlide,
  errorMsg,
  setErrorMsg,
}: QuestionProps) {
  const { state, dispatch } = useQuestions();
  const { firstName } = state;
  const inputTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTextRef.current?.focus();
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.firstName;
        return prevValue;
      });
    dispatch({ type: SET_FIRST_NAME, payload: event.target.value });
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
      <QuestionNumHeading questionNum={1}>
        What&apos;s your first name? *
      </QuestionNumHeading>

      <QuestionInputText
        placeholder="Type your answer here..."
        value={firstName}
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
