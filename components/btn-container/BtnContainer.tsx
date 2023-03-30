import styles from "./BtnContainer.module.css";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { questrialFont } from "@/utils";
import classNames from "classnames";

type BtnContainerProps = {
  readonly children: ReactNode;
  readonly showPressEnter: boolean;
  readonly className?: string;
  readonly onClick?: MouseEventHandler;
};

export function BtnContainer({
  children,
  showPressEnter,
  className,
  onClick,
}: BtnContainerProps) {
  const [isOnMobile, setIsOnMobile] = useState(false);

  useEffect(() => {
    if (navigator?.userAgent.toLowerCase().includes("mobile")) {
      setIsOnMobile(true);
    }

    const handleResizeEvent = () => {
      setIsOnMobile(navigator?.userAgent.toLowerCase().includes("mobile"));
    };

    window.addEventListener("resize", handleResizeEvent);

    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  return (
    <div className={classNames(styles["btn-container"], className)}>
      <button className={questrialFont.className} onClick={onClick}>
        {children}
      </button>
      {isOnMobile || !showPressEnter || (
        <span>
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
}
