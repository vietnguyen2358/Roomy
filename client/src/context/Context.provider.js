import React from "react";

// Contexts
import { GlobalContextProvider } from "./Global/Global.context";
import { APIContextProvider } from "./API/API.context";
import { UserContextProvider } from "./User/User.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <APIContextProvider>
        <UserContextProvider>{props.children}</UserContextProvider>
      </APIContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
