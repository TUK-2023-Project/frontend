import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingSpinner = () => {
  return (
    <div className="sweet-loading">
      <PuffLoader
        color={"green"}
        loading
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
