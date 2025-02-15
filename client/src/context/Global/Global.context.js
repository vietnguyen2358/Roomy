import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  const [loadingState, setLoadingState] = useState({
    show: false,
    message: "Loading...",
  });

  const showLoading = (message) => setLoadingState({ show: true, message });
  const closeLoading = () =>
    setLoadingState({ show: false, message: "Loading..." });

  return (
    <GlobalContext.Provider value={{ loadingState, showLoading, closeLoading }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
