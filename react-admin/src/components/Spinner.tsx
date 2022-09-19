import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner-border text-primary"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        left: "calc(50% - 50px)",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
