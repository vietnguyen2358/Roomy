import React from "react";

function AuthContainer(props) {
  return (
    <div className="auth-container">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/auth-bg.png"}
        alt="circle"
        className="auth-container__auth-bg"
      />
      <img
        src={process.env.PUBLIC_URL + "/assets/images/auth-img.png"}
        alt="people"
        className="auth-container__auth-img"
      />
      <div className="auth-container__title">
        <h1>Welcome to Roomy</h1>
        <h2>Ready to find your next roommate?</h2>
      </div>

      {props.children}
    </div>
  );
}

export default AuthContainer;
