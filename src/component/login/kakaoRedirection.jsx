import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { customAxios } from '../../config/axios-config';

export default function KakaoRedirection() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            // console.log("Authorization Code : ", code);
            customAxios
                .get(`/v1/auths/oauth/kakao?code=${code}`)
                .then((res) => {
                    console.log(res);
                    const accessToken = res.data.data.accessToken;
                    const refreshToken = res.data.data.refreshToken;
                    const userId = res.data.data.userId;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('userId', userId);

                    // console.log(localStorage.getItem("accessToken"));
                    // console.log(localStorage.getItem("refreshToken"));
                    // 메인 페이지 이동
                    navigate('/');
                    // console.log(localStorage.getItem("accessToken"));
                    // console.log(localStorage.getItem("refreshToken"));
                })
                .catch((error) => {
                    // console.error(error);
                });
        }
    }, [location.search, navigate]);

    return <>loading...</>;
}
