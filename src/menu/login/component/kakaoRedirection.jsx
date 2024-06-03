import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function KakaoRedirection() {
    // const [userId, setUserId] = useState(0);

    // const getUserData = async (token) => {
    //     const user = await axios.get(``, {
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //         }
    //     });
    //     console.log(user);
    //     // userId, accessToken, refreshToken
    //     return user.data;
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const token = localStorage.getItem("token");
    //         getUserData(token)
    //             .then((data) => {
    //                 setUserId(data.userId);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 localStorage.removeItem('token');
    //             })
    //     }
    // }, []);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
            console.log('Authorization Code : ', code);
            axios
                .get(`http://13.125.141.171/v1/auths/oauth/kakao?code=${code}`)
                .then((res) => {
                    const accessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', accessToken);

                    // 메인 페이지 이동
                    navigate(`/`);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [location.search, navigate]);

    return <>loading...</>;
}
