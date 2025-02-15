import React from "react";

// Components
import AuthForm from "../../layout/auth/AuthForm";

function SignUp() {
  return (
    <div className="home-container">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/auth-bg.png"}
        alt="circle"
        className="home-container__auth-bg"
      />
      <img
        src={process.env.PUBLIC_URL + "/assets/images/auth-img.png"}
        alt="people"
        className="home-container__auth-img"
      />

      {/* Auth Form */}
      <AuthForm />
    </div>
  );
}

export default SignUp;
