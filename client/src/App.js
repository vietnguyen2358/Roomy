import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global/Global.context";

// Components
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import SignIn from "./components/pages/SignIn/SignIn";
import Spinner from "./components/standalone/Spinner/Spinner";
import Navbar from "./components/layout/nav/Navbar";
import CreatePostForm from "./components/pages/CreatePostForm/CreatePostForm";
import { useUser } from "./context/User/User.context";

function App() {
  const { pathname } = useLocation();
  const { loadingState } = useGlobal();
  const { auth } = useUser();
  const blacklist = {
    "/signin": true,
    "/signup": true,
  };
  const isAuthPage = blacklist[pathname];

  return (
    <div className="App">
      {/* Navbar */}
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* For Mobile <Navigate to="/auth" replace /> */}
        <Route
          path="/"
          element={
            auth.isSignedIn ? <Home /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/signup"
          element={auth.isSignedIn ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={auth.isSignedIn ? <Navigate to="/" replace /> : <SignIn />}
        />
        <Route
          path="/create"
          element={
            auth.isSignedIn ? (
              <CreatePostForm />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Spinner */}
      {loadingState.show && <Spinner />}
    </div>
  );
}

export default App;
