import styles from "./BtnContainer.module.css";
import { ReactNode, useEffect, useState } from "react";
import { questrialFont } from "@/utils";
import classNames from "classnames";

type BtnContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function BtnContainer({ children, className }: BtnContainerProps) {
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
      <button className={questrialFont.className}>{children}</button>
      {isOnMobile || (
        <span>
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
}
