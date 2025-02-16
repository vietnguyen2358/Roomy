import React, { createContext, useContext, useState } from "react";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalContextProvider = (props) => {
  const [loadingState, setLoadingState] = useState({
    show: false,
    message: "Loading...",
  });

  const [houseCardState, setHouseCardState] = useState({
    show: false,
    data: null,
    refetch: null,
  });

  const showHouseCard = (data, refetch) => {
    const updatedUserList = data.userLists.split(",");
    setHouseCardState({
      show: true,
      data: { ...data, userLists: updatedUserList },
      refetch,
    });
  };

  const closeHouseCard = (data) =>
    setHouseCardState({ show: false, data: null });

  const showLoading = (message) => setLoadingState({ show: true, message });
  const closeLoading = () =>
    setLoadingState({ show: false, message: "Loading..." });

  return (
    <GlobalContext.Provider
      value={{
        loadingState,
        showLoading,
        closeLoading,
        houseCardState,
        showHouseCard,
        closeHouseCard,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
