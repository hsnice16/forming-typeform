import { QuestionInputText } from "../index";
import styles from "./QuestionInputIndustries.module.css";
import classNames from "classnames";
import Image from "next/image";
import { IndustriesProps } from "../questions/QuestionTwo";
import { useIndustries, useQuestionReducer } from "@/hooks";
import { MouseEvent } from "react";
import { SET_INDUSTRY } from "@/reducers";

export function QuestionInputIndustries({
  showIndustriesList,
  setShowIndustriesList,
}: IndustriesProps) {
  const { industries } = useIndustries();
  const { state, dispatch } = useQuestionReducer();
  const { industry } = state;

  function handleDropdownClick(event: MouseEvent) {
    event.stopPropagation();
    setShowIndustriesList(true);
  }

  function handleDropdownOptionClick(_industry: string) {
    dispatch({ type: SET_INDUSTRY, payload: _industry });
    setTimeout(() => setShowIndustriesList(false), 500);
  }

  return (
    <div
      className={styles["dropdown-select__industries"]}
      onClick={handleDropdownClick}
    >
      <QuestionInputText
        className={styles["dropdown-select__input"]}
        placeholder="Type or select an option"
        value={industry}
      />

      <button
        className={classNames(styles["dropdown-select__btn"], {
          [styles["close"]]: !showIndustriesList,
        })}
      >
        <Image
          src="/navigate-next.svg"
          alt="dropdown arrow"
          width={26}
          height={26}
        />
      </button>

      <div
        className={classNames(styles["dropdown-select__options"], {
          [styles["show"]]: showIndustriesList,
        })}
      >
        {industries.map(function (_industry) {
          return (
            <span
              key={_industry}
              className={classNames(styles["dropdown-select__option"], {
                [styles["animate"]]: industry === _industry,
                [styles["selected"]]: industry === _industry,
              })}
              onClick={() => handleDropdownOptionClick(_industry)}
            >
              {_industry}
              {industry === _industry && (
                <Image
                  src="/check-small.svg"
                  alt="check small"
                  width={30}
                  height={30}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
