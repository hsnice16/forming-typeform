import { questrialFont } from "@/utils";
import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import styles from "./QuestionInputText.module.css";
import classNames from "classnames";

type QuestionInputTextProps = {
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
};

const QuestionInputText = forwardRef(
  (
    { placeholder, className, value, onChange }: QuestionInputTextProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
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
);

QuestionInputText.displayName = "QuestionInputText";

export { QuestionInputText };
