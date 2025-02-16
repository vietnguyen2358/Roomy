import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// User Context
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    uid: "",
  });
  const [auth, setAuth] = useState({ isSignedIn: false });
  const navigate = useNavigate();

  const updateUser = (userData) => setUser({ ...userData });
  const signUserIn = () => setAuth({ isSignedIn: true });
  const logoutUser = () => {
    setUser({ email: "", firstName: "", lastName: "", uid: "" });
    setAuth({ isSignedIn: false });
    navigate("/signin");
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, auth, signUserIn, logoutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
