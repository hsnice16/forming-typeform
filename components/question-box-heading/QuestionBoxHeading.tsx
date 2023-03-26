import { ReactNode } from "react";
import styles from "./QuestionBoxHeading.module.css";

type QuestionBoxHeadingProps = {
  readonly children: ReactNode;
};

export function QuestionBoxHeading({ children }: QuestionBoxHeadingProps) {
  return <h1 className={styles["question-box__heading"]}>{children}</h1>;
}
