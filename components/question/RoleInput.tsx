import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionBoxPara,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { useQuestions, useSharedStates } from "@/contexts";
import { ROLES } from "@/constants";
import { SET_ROLE } from "@/reducers";

export function RoleInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.role ?? "";
  const { role } = state;

  function handleDropdownOptionClick(_role: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.role;
        return prevValue;
      });

    if (_role === role) {
      dispatch({ type: SET_ROLE, payload: "" });
    } else {
      dispatch({ type: SET_ROLE, payload: _role });
      setTimeout(() => handleOkClick(), 600);
    }
  }

  return (
    <>
      <QuestionNumHeading questionNum={4}>
        Your role in your company? *
      </QuestionNumHeading>

      <QuestionBoxPara>
        We want to understand how you spend your time right now.
      </QuestionBoxPara>

      <DropdownSelect className={styles["role-dropdown"]}>
        <div>
          {Object.keys(ROLES).map((roleKey) => {
            const _role = ROLES[roleKey];

            return (
              <DropdownSelectOption
                key={roleKey}
                className={styles["role-option"]}
                onClick={() => handleDropdownOptionClick(_role)}
                isSelected={_role === role}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: _role === role,
                  })}
                >
                  {roleKey}
                </span>
                {_role}
              </DropdownSelectOption>
            );
          })}
        </div>
      </DropdownSelect>

      {errorMsg && <Error message={errorMsg} />}

      {role && errorMsg === "" && (
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
