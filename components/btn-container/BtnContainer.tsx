import styles from "./BtnContainer.module.css";
import { useEffect, useState } from "react";
import { questrialFont } from "@/utils";

export function BtnContainer() {
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
    <div className={styles["btn-container"]}>
      <button className={questrialFont.className}>I agree</button>
      {isOnMobile || (
        <span>
          press <strong>Enter ↵</strong>
        </span>
      )}
    </div>
  );
}
