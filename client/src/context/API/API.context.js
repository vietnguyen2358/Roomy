import React, { createContext, useContext } from "react";
import Axios from "axios";

// API Context
const APIContext = createContext();
export const useAPI = () => useContext(APIContext);
export const APIContextProvider = (props) => {
  const { REACT_APP_API_URI } = process.env;

  // Get Zillow Info
  const getZillowInfo = (zillowLink, cb) =>
    Axios.post(REACT_APP_API_URI + "/ZillowInfo", { zillowLink })
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // Add User
  const addUser = (userData, cb) =>
    Axios.post(REACT_APP_API_URI + "/addUser", { ...userData })
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // Sign In User
  const signInUser = (userData, cb) =>
    Axios.post(REACT_APP_API_URI + "/verifyUser", { ...userData })
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // Create Group
  const createGroup = (data, cb) =>
    Axios.post(REACT_APP_API_URI + "/addGroup", data)
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // Fetch All Groups
  const fetchAllGroups = () =>
    Axios.get(REACT_APP_API_URI + "/fetchAllGroup")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return null;
      });

  return (
    <APIContext.Provider
      value={{
        getZillowInfo,
        addUser,
        signInUser,
        createGroup,
        fetchAllGroups,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
