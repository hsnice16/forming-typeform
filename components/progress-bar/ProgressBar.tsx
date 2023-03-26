import styles from "./ProgressBar.module.css";

export function ProgressBar() {
  return (
    <div className={styles["progress-bar__path"]}>
      <div className={styles["progress-bar"]} />
    </div>
  );
}
