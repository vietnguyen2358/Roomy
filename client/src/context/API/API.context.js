import React, { createContext, useContext } from "react";
import Axios from "axios";

// API Context
const APIContext = createContext();
export const useAPI = () => useContext(APIContext);
export const APIContextProvider = (props) => {
  const { REACT_APP_API_URI } = process.env;
  const getZillowInfo = (zillowLink, cb) =>
    Axios.post(REACT_APP_API_URI + "/ZillowInfo", { zillowLink })
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  return (
    <APIContext.Provider value={{ getZillowInfo }}>
      {props.children}
    </APIContext.Provider>
  );
};
