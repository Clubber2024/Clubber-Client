import React from "react";
import Login from "../component/login/Login";
import LoginLogo from "../component/login/LoginLogo";
import "./loginPage.css";

function LoginPage() {
  return (
    <>
      <div className="login_wrapper">
        <div>
          <LoginLogo />
        </div>

        <div>
          <Login />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
