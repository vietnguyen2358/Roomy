import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Contexts
import { useGlobal } from "./context/Global/Global.context";

// Components
import Home from "./components/pages/Home/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import SignIn from "./components/pages/SignIn/SignIn";
import Spinner from "./components/standalone/Spinner/Spinner";
import Navbar from "./components/layout/nav/Navbar";
import CreatePostForm from "./components/pages/CreatePostForm/CreatePostForm";

function App() {
  const { pathname } = useLocation();
  const { loadingState } = useGlobal();
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
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<CreatePostForm />} />

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Spinner */}
      {loadingState.show && <Spinner />}
    </div>
  );
}

export default App;
