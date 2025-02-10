import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { customAxios } from '../../config/axios-config';
import LoadingPage from '../loading/LoadingPage';

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

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    // 메인 페이지 이동
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [location.search, navigate]);

    return <LoadingPage />;
}
