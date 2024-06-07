import React, { useState } from 'react';
import './login.css';

function Login() {
    const REST_API_KEY = '6a5dafa758e469d18292acc6fbca333b';
    const REDIRECT_URI = 'http://13.125.141.171/v1/auths/oauth/kakao';
    const [activeForm, setActiveForm] = useState('sign-in-form-active');

    // 1. 카카오 버튼 클릭 시, 로그인 창 띄우기 (링크는 노션에서 가져옴)
    //  rest api key와 redirect uri 값 받아서 해당 링크로 연결, window.location.href 이용하여 주소 변경
    const kakaoLoginHandler = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
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
                                    className={activeForm === 'sign-in-form-active' ? 'sign-in active' : 'sign-in'}
                                    onClick={() => handleTabClick('sign-in-form-active')}
                                >
                                    일반
                                </span>
                                <span
                                    className={activeForm === 'sign-up-form-active' ? 'sign-up active' : 'sign-up'}
                                    onClick={() => handleTabClick('sign-up-form-active')}
                                >
                                    관리자
                                </span>
                            </div>
                            <div className="sign-in-up">
                                {activeForm === 'sign-in-form-active' && (
                                    <form className="sign-in-form-active" onSubmit={handleFormSubmit}>
                                        <div>
                                            <button type="button" className="button-style" onClick={kakaoLoginHandler}>
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

                                {activeForm === 'sign-up-form-active' && (
                                    <form className="sign-up-form-active" onSubmit={handleFormSubmit}>
                                        <input type="email" placeholder="이메일" autoComplete="current-email" />
                                        <input type="password" placeholder="비밀번호" autoComplete="current-password" />
                                        <br />
                                        <input type="submit" className="button-color" value="로그인" />
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
