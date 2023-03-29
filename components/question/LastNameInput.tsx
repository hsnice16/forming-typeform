import { SET_LAST_NAME } from "@/reducers";
import { ChangeEventHandler, useEffect, useRef } from "react";
import {
  BtnContainer,
  Error,
  QuestionInputText,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { useQuestions, useSharedStates } from "@/contexts";

export function LastNameInput() {
  const { errorMsg: error, setErrorMsg } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.lastName ?? "";
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
    <>
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
    </>
  );
}
