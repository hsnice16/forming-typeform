import { ReactNode } from "react";
import styles from "./QuestionBox.module.css";

type QuestionBoxProps = {
  readonly children: ReactNode;
};

export function QuestionBox({ children }: QuestionBoxProps) {
  return <div className={styles["question-box"]}>{children}</div>;
}
