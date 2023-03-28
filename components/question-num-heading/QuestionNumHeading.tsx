import { QuestionBoxHeading } from "../index";
import classNames from "classnames";
import styles from "./QuestionNumHeading.module.css";
import Image from "next/image";
import { ReactNode } from "react";

type QuestionNumHeadingProps = {
  readonly children: ReactNode;
  readonly questionNum: number;
};

export function QuestionNumHeading({
  children,
  questionNum,
}: QuestionNumHeadingProps) {
  return (
    <QuestionBoxHeading
      className={classNames(styles["question-box__heading"], styles["num"])}
    >
      <span>
        {questionNum}
        <Image
          src="./right-arrow.svg"
          alt="right arrow"
          width={16}
          height={16}
        />
      </span>
      {children}
    </QuestionBoxHeading>
  );
}
