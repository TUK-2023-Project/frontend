import React from "react";
import RiseLoader from "react-spinners/RiseLoader";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles["spinner-wrapper"]}>
      <RiseLoader
        color={"orange"}
        loading
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
