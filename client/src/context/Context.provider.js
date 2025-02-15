import React from "react";

// Contexts
import { GlobalContextProvider } from "./Global/Global.context";

function ContextProvider(props) {
  return <GlobalContextProvider>{props.children}</GlobalContextProvider>;
}

export default ContextProvider;
