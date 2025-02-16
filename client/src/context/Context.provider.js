import React from "react";

// Contexts
import { GlobalContextProvider } from "./Global/Global.context";
import { APIContextProvider } from "./API/API.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <APIContextProvider>{props.children}</APIContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
