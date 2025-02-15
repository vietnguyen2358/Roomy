import React from "react";

function Home() {
  return (
    <div className="home-container">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/auth-bg.png"}
        alt="circle"
        className="home-container__auth-bg"
      />
    </div>
  );
}

export default Home;
