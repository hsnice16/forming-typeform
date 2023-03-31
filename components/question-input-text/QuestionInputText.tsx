import { questrialFont } from "@/utils";
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import styles from "./QuestionInputText.module.css";
import classNames from "classnames";

type QuestionInputTextProps = {
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly type?: string;
};

const QuestionInputText = forwardRef(
  (
    { placeholder, className, value, onChange, type }: QuestionInputTextProps,
    passedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const inputTextRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setTimeout(() => {
        inputTextRef.current?.focus();
      }, 500);
    }, []);

    return (
      <input
        ref={passedRef ?? inputTextRef}
        className={classNames(
          styles["question-input__text"],
          questrialFont.className,
          className
        )}
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
      />
    );
  }
);

QuestionInputText.displayName = "QuestionInputText";

export { QuestionInputText };
