import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/axios-config";

function Login() {
  const REST_API_KEY = "6a5dafa758e469d18292acc6fbca333b";
  const REDIRECT_URI = "http://localhost:3000/v1/auths/oauth/kakao";
  const [activeForm, setActiveForm] = useState("sign-in-form-active");

  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const navigate = useNavigate();

  // 1. 카카오 버튼 클릭 시, 로그인 창 띄우기 (링크는 노션에서 가져옴)
  //  rest api key와 redirect uri 값 받아서 해당 링크로 연결, window.location.href 이용하여 주소 변경
  const kakaoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  };
  const adminLoginHandler = async () => {
    // console.log(adminId);
    // console.log(adminPw);
    try {
      const res = await customAxios.post(`/v1/admins/login`, {
        username: adminId,
        password: adminPw,
      });
      console.log(res);
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      localStorage.setItem("adminId", adminId);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (error) {
      console.error("Admin Login Error : ", error);
    }
  };

  const saveAdminId = (event) => {
    setAdminId(event.target.value);
    console.log(event.target.value);
  };

  const saveAdminPw = (event) => {
    setAdminPw(event.target.value);
    console.log(event.target.value);
  };

  const handleTabClick = (form) => {
    setActiveForm(form);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="global_cont">
            <div className="inner_cont">
              <div className="sign">
                <span
                  className={
                    activeForm === "sign-in-form-active"
                      ? "sign-in active"
                      : "sign-in"
                  }
                  onClick={() => handleTabClick("sign-in-form-active")}
                >
                  일반
                </span>
                <span
                  className={
                    activeForm === "sign-up-form-active"
                      ? "sign-up active"
                      : "sign-up"
                  }
                  onClick={() => handleTabClick("sign-up-form-active")}
                >
                  관리자
                </span>
              </div>
              <div className="sign-in-up">
                {activeForm === "sign-in-form-active" && (
                  <form
                    className="sign-in-form-active"
                    onSubmit={handleFormSubmit}
                  >
                    <div>
                      <button
                        type="button"
                        className="button-style"
                        onClick={kakaoLoginHandler}
                      >
                        <div className="center">
                          <img
                            className="kakaologo"
                            alt="kakaologo"
                            src="/login/kakaologo.png"
                          />
                          <p className="text">카카오 로그인</p>
                        </div>
                      </button>
                    </div>
                  </form>
                )}

                {activeForm === "sign-up-form-active" && (
                  <form
                    className="sign-up-form-active"
                    onSubmit={handleFormSubmit}
                  >
                    <input
                      type="text"
                      placeholder="이메일"
                      autoComplete="current-email"
                      className="email-input"
                      value={adminId}
                      onChange={saveAdminId}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="current-password"
                      className="password-input"
                      value={adminPw}
                      onChange={saveAdminPw}
                    />
                    <button
                      className="login-button"
                      onClick={adminLoginHandler}
                    >
                      로그인
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
