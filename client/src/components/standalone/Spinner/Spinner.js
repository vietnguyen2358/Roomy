import React from "react";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";

function Spinner() {
  const { loadingState } = useGlobal();

  return (
    <div className="spinner-container center">
      <span className="loader"></span>
      <p>{loadingState.message}</p>
    </div>
  );
}

export default Spinner;
