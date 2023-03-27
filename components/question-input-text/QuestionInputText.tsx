import { useQuestionReducer } from "@/hooks";
import { SET_FIRST_NAME } from "@/reducers";
import { questrialFont } from "@/utils";
import { ChangeEventHandler } from "react";
import styles from "./QuestionInputText.module.css";
import classNames from "classnames";

export function QuestionInputText() {
  const { state, dispatch } = useQuestionReducer();
  const { firstName } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: SET_FIRST_NAME, payload: event.target.value });
  };

  return (
    <input
      className={classNames(
        styles["question-input__text"],
        questrialFont.className
      )}
      type="text"
      placeholder="Type your answer here..."
      value={firstName}
      onChange={handleInputChange}
    />
  );
}
