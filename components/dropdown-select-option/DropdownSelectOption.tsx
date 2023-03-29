import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import styles from "./DropdownSelectOption.module.css";

type DropdownSelectOptionProps = {
  readonly isSelected?: boolean;
  readonly onClick?: MouseEventHandler;
  readonly className?: string;
  readonly children: ReactNode;
};

export function DropdownSelectOption({
  isSelected,
  onClick,
  className,
  children,
}: DropdownSelectOptionProps) {
  return (
    <span
      className={classNames(styles["dropdown-select__option"], className, {
        [styles["animate"]]: isSelected,
        [styles["selected"]]: isSelected,
      })}
      onClick={onClick}
    >
      {children}
      {isSelected && (
        <Image
          src="/check-small.svg"
          alt="check small"
          width={30}
          height={30}
        />
      )}
    </span>
  );
}
