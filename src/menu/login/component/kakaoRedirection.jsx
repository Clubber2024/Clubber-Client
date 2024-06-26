import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function KakaoRedirection() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            console.log('Authorization Code : ', code);
            axios
                .get(`http://13.125.141.171:8080/v1/auths/oauth/kakao?code=${code}`)
                .then((res) => {
                    const accessToken = res.data.data.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    // 메인 페이지 이동
                    navigate(`/`);
                    // console.log(localStorage.getItem('accessToken'));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [location.search, navigate]);

    return <>loading...</>;
}
