import { ReactNode } from "react";
import styles from "./QuestionBox.module.css";
import classNames from "classnames";

type QuestionBoxProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function QuestionBox({ children, className }: QuestionBoxProps) {
  return (
    <div className={classNames(styles["question-box"], className)}>
      {children}
    </div>
  );
}
