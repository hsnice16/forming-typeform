import { questrialFont } from "@/utils";
import { ChangeEventHandler } from "react";
import styles from "./QuestionInputText.module.css";
import classNames from "classnames";

type QuestionInputTextProps = {
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function QuestionInputText({
  placeholder,
  className,
  value,
  onChange,
}: QuestionInputTextProps) {
  return (
    <input
      className={classNames(
        styles["question-input__text"],
        questrialFont.className,
        className
      )}
      type="text"
      placeholder={placeholder ?? ""}
      value={value}
      onChange={onChange}
    />
  );
}
