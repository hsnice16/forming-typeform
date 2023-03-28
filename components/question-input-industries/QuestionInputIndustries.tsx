import { QuestionInputText } from "../index";
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
  useMemo,
  useRef,
  useState,
} from "react";
import { SET_INDUSTRY } from "@/reducers";
import { useQuestions } from "@/contexts";
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

  const { industry } = state;
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [localIndustry, setLocalIndustry] = useState(industry);

  const filterIndustries = useMemo(() => {
    return industries.filter((_industry) =>
      _industry.toLowerCase().includes(industry.toLowerCase())
    );
  }, [industries, industry]);

  useEffect(() => {
    inputTextRef.current?.focus();
  }, []);

  useEffect(() => {
    if (industry && filterIndustries.length === 0) {
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
  }, [filterIndustries.length, industry, setErrorMsg]);

  function handleDropdownClick(event: MouseEvent) {
    event.stopPropagation();
    !industry && setShowIndustriesList(true);
  }

  function handleInputChange(event: ChangeEvent) {
    const typedValue = (event.target as HTMLInputElement).value;

    if (typedValue) {
      setShowIndustriesList(true);
    } else {
      setShowIndustriesList(false);
    }

    dispatch({
      type: SET_INDUSTRY,
      payload: typedValue,
    });
  }

  function handleCrossBtnClick() {
    if (industry) {
      setLocalIndustry("");
      setShowIndustriesList(false);
      dispatch({ type: SET_INDUSTRY, payload: "" });
      inputTextRef.current?.focus();
    }
  }

  function handleDropdownOptionClick(_industry: string) {
    setLocalIndustry(_industry);

    setTimeout(function () {
      dispatch({ type: SET_INDUSTRY, payload: _industry });
      setShowIndustriesList(false);
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
        value={industry}
        onChange={handleInputChange}
        ref={inputTextRef}
      />

      <button
        className={classNames(styles["dropdown-select__btn"], {
          [styles["close"]]: !showIndustriesList && !industry,
        })}
        onClick={handleCrossBtnClick}
      >
        <Image
          src={industry ? "/close.svg" : "/navigate-next.svg"}
          alt="dropdown arrow"
          width={26}
          height={26}
        />
      </button>

      <div
        className={classNames(styles["dropdown-select__options"], {
          [styles["show"]]: showIndustriesList && filterIndustries.length,
        })}
      >
        {filterIndustries.map(function (_industry) {
          return (
            <span
              key={_industry}
              className={classNames(styles["dropdown-select__option"], {
                [styles["animate"]]: localIndustry === _industry,
                [styles["selected"]]: localIndustry === _industry,
              })}
              onClick={() => handleDropdownOptionClick(_industry)}
            >
              {_industry}
              {localIndustry === _industry && (
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
