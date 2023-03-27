import { QuestionBoxHeading } from "../index";
import classNames from "classnames";
import styles from "./QuestionNumHeading.module.css";
import Image from "next/image";

export function QuestionNumHeading() {
  return (
    <QuestionBoxHeading
      className={classNames(styles["question-box__heading"], styles["num"])}
    >
      <span>
        1
        <Image
          src="./right-arrow.svg"
          alt="right arrow"
          width={16}
          height={16}
        />
      </span>
      What&apos;s your first name? *
    </QuestionBoxHeading>
  );
}
