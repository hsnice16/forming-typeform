import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./DropdownSelect.module.css";

type DropdownSelectProps = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function DropdownSelect({ className, children }: DropdownSelectProps) {
  return (
    <div className={classNames(styles["dropdown-select__options"], className)}>
      {children}
    </div>
  );
}
