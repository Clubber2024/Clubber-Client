import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../config/axios-config';
import ErrorModal from '../modal/ErrorModal';
import { LinkItem } from '../branch/BranchCentral';
import { getAccessToken, saveTokens } from '../../auth/AuthService';

function Login() {
    const accessToken = getAccessToken();
    const restApiKey = process.env.REACT_APP_REST_API_KEY;
    const redirectURL = process.env.REACT_APP_REDIRECT_URI;
    const [activeForm, setActiveForm] = useState('sign-in-form-active');
    const [adminId, setAdminId] = useState('');
    const [adminPw, setAdminPw] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
    };

    useEffect(() => {
        if (accessToken) {
            // 이미 로그인된 상태면 메인 페이지로 이동
            navigate('/', { replace: true });
        }
    });

    // 카카오 로그인 핸들러 : 카카오 버튼 클릭 시, 로그인 창 (링크는 노션에서 가져옴)
    //  rest api key와 redirect uri 값 받아서 해당 링크로 연결, window.location.href 이용하여 주소 변경
    const kakaoLoginHandler = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirectURL}`;
    };

    // 관리자 로그인 핸들러
    const adminLoginHandler = async () => {
        if (!isId || !isPw) return;
        try {
            const res = await customAxios.post(`/v1/admins/login`, {
                username: adminId,
                password: adminPw,
            });

            const { accessToken, refreshToken } = res.data.data;
            // 로컬스토리지에 accessToken, refreshToken, isAdmin 값 저장
            saveTokens(accessToken, refreshToken, true);

            navigate('/');
        } catch (error) {
            if (error.response.data.status === 401) {
                setModalMessage(error.response.data.reason);
                setIsModalOpen(true);
            }
            console.log(error);
        }
    };

    const saveAdminId = (event) => {
        const value = event.target.value;
        setAdminId(value);
        setIsId(true);
        if (value == '') {
            setIsId(false);
        }
    };
    const saveAdminPw = (event) => {
        const value = event.target.value;
        setAdminPw(value);
        setIsPw(true);
        if (value == '') {
            setIsPw(false);
        }
    };
    const handleTabClick = (form) => setActiveForm(form);
    const handleFormSubmit = (event) => event.preventDefault();

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
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            autoComplete="current-id"
                                            className="id-input"
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
                                            className={isId && isPw ? 'login-button-active' : 'login-button'}
                                            onClick={adminLoginHandler}
                                        >
                                            로그인
                                        </button>
                                        <div className="sign_up_div">
                                            <LinkItem to={`/login/adminFindId`} className="sign_up_p">
                                                아이디 찾기 |
                                            </LinkItem>

                                            <LinkItem to={`/login/adminFindPassword`} className="sign_up_p">
                                                비밀번호 찾기 |
                                            </LinkItem>

                                            <LinkItem to={'/login/adminJoin'} className="sign_up_p">
                                                회원가입
                                            </LinkItem>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </>
    );
}

export default Login;
