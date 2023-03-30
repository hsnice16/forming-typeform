import { useQuestions, useSharedStates } from "@/contexts";
import { getGoals } from "@/utils";
import { useMemo } from "react";
import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { REMOVE_GOAL, SET_GOALS } from "@/reducers";

export function GoalInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.goals ?? "";
  const { firstName, role, goals } = state;

  const goalsOptions = useMemo(
    () =>
      getGoals(
        role.toLowerCase().includes("founder") ? "FOUNDER" : "NON_FOUNDER"
      ),
    [role]
  );

  function handleDropdownOptionClick(_goal: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.goals;
        return prevValue;
      });

    if (goals.includes(_goal)) {
      dispatch({ type: REMOVE_GOAL, payload: _goal });
    } else {
      dispatch({ type: SET_GOALS, payload: _goal });

      if (goals.length === 1) {
        setTimeout(() => handleOkClick(), 600);
      }
    }
  }

  const chooseNum = 2 - goals.length;

  return (
    <>
      <QuestionNumHeading questionNum={5}>
        {firstName}, what&apos;s your professional goal for the next 12 months?
        *
      </QuestionNumHeading>

      {chooseNum === 2 && (
        <span className={styles["choose-num"]}>Choose 2</span>
      )}
      {chooseNum === 1 && (
        <span className={styles["choose-num"]}>Choose 1 more</span>
      )}

      <DropdownSelect
        className={classNames(
          styles["role-dropdown"],
          styles["goal-dropdown"],
          {
            [styles["remove-margin__top"]]: chooseNum !== 0,
          }
        )}
      >
        <div>
          {Object.keys(goalsOptions).map((goalKey) => {
            const _goal = goalsOptions[goalKey];
            const isSelected = goals.includes(_goal);

            return (
              <DropdownSelectOption
                key={goalKey}
                className={classNames(
                  styles["role-option"],
                  styles["goal-option"],
                  {
                    [styles["not-selected"]]: !isSelected && goals.length === 2,
                  }
                )}
                onClick={() => handleDropdownOptionClick(_goal)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {goalKey}
                </span>
                <span className={styles["goal"]}>{_goal}</span>
              </DropdownSelectOption>
            );
          })}
        </div>
      </DropdownSelect>

      {errorMsg && <Error message={errorMsg} />}

      {goals.length === 2 && errorMsg === "" && (
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
