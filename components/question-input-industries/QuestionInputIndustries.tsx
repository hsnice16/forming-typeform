import {
  DropdownSelect,
  DropdownSelectOption,
  QuestionInputText,
} from "../index";
import styles from "./QuestionInputIndustries.module.css";
import classNames from "classnames";
import Image from "next/image";
import { useIndustries } from "@/hooks";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { SET_INDUSTRY } from "@/reducers";
import { useQuestions, useSharedStates } from "@/contexts";
import { IndustriesProps, ObjectType } from "@/types";

type QuestionInputIndustriesProps = IndustriesProps & {
  readonly setErrorMsg: Dispatch<SetStateAction<ObjectType>> | undefined;
};

export function QuestionInputIndustries({
  showIndustriesList,
  setShowIndustriesList,
  setErrorMsg,
}: QuestionInputIndustriesProps) {
  const { industries } = useIndustries();
  const { state, dispatch } = useQuestions();
  const { handleOkClick } = useSharedStates();

  const { industry } = state;
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [localIndustry, setLocalIndustry] = useState(industry);
  const [optionClicked, setOptionClicked] = useState(false);
  const [filterIndustries, setFilteredIndustries] = useState<string[]>([]);

  useEffect(() => {
    if (optionClicked) {
      return;
    }

    setFilteredIndustries(
      industries.filter((_industry) =>
        _industry.toLowerCase().includes(localIndustry.toLowerCase())
      )
    );
  }, [industries, localIndustry, optionClicked]);

  useEffect(() => {
    setTimeout(() => {
      inputTextRef.current?.focus();
    }, 500);
  }, []);

  useEffect(() => {
    if (
      localIndustry &&
      filterIndustries.length === 0 &&
      industry !== localIndustry
    ) {
      setErrorMsg &&
        setErrorMsg((prevValue) => ({
          ...prevValue,
          industry: "No suggestions found",
        }));
    } else {
      setErrorMsg &&
        setErrorMsg((prevValue) => {
          delete prevValue.industry;
          return prevValue;
        });
    }
  }, [filterIndustries.length, industry, localIndustry, setErrorMsg]);

  function handleDropdownClick(event: MouseEvent) {
    event.stopPropagation();
    setShowIndustriesList(true);
  }

  function handleInputChange(event: ChangeEvent) {
    const typedValue = (event.target as HTMLInputElement).value;
    dispatch({ type: SET_INDUSTRY, payload: "" });

    if (typedValue) {
      setShowIndustriesList(true);
    } else {
      setShowIndustriesList(false);
    }

    setLocalIndustry(typedValue);
  }

  function handleUpArrowClick(event: MouseEvent) {
    if (showIndustriesList) {
      event.stopPropagation();
      setShowIndustriesList(false);
    }
  }

  function handleCrossBtnClick(event: MouseEvent) {
    event.stopPropagation();
    setLocalIndustry("");
    setShowIndustriesList(false);
    dispatch({ type: SET_INDUSTRY, payload: "" });
    inputTextRef.current?.focus();
  }

  function handleDropdownOptionClick(_industry: string) {
    setLocalIndustry(_industry);
    setOptionClicked(true);

    setTimeout(function () {
      setErrorMsg &&
        setErrorMsg((prevValue) => {
          delete prevValue.industry;
          return prevValue;
        });

      setOptionClicked(false);
      dispatch({ type: SET_INDUSTRY, payload: _industry });
      setShowIndustriesList(false);
      setTimeout(() => handleOkClick(), 600);
    }, 500);
  }

  return (
    <div
      className={styles["dropdown-select__industries"]}
      onClick={handleDropdownClick}
    >
      <QuestionInputText
        className={styles["dropdown-select__input"]}
        placeholder="Type or select an option"
        value={localIndustry}
        onChange={handleInputChange}
        ref={inputTextRef}
      />

      <button
        className={classNames(styles["dropdown-select__btn"], {
          [styles["close"]]: !showIndustriesList && !localIndustry,
        })}
        onClick={localIndustry ? handleCrossBtnClick : handleUpArrowClick}
      >
        <Image
          src={localIndustry ? "/close.svg" : "/navigate-next.svg"}
          alt="dropdown arrow"
          width={26}
          height={26}
        />
      </button>

      <DropdownSelect
        className={classNames(styles["dropdown-select__options"], {
          [styles["show"]]: showIndustriesList && filterIndustries.length,
        })}
      >
        {filterIndustries.map(function (_industry) {
          return (
            <DropdownSelectOption
              key={_industry}
              onClick={() => handleDropdownOptionClick(_industry)}
              isSelected={localIndustry === _industry && optionClicked}
            >
              {_industry}
            </DropdownSelectOption>
          );
        })}
      </DropdownSelect>
    </div>
  );
}
