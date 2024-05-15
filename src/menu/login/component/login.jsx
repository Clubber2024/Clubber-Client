import React, { useState } from 'react';
import './login.css';

function Login() {
    const [activeForm, setActiveForm] = useState('sign-in-form-active');

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
                                        <button type="button" className="button-style">
                                            <div className="kakao">
                                                <img className="kakaologo" alt="kakaologo" src="/login/kakaologo.png" />
                                                <p className="text">카카오 로그인</p>
                                            </div>
                                        </button>
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
