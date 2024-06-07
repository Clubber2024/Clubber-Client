import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();
    const getToken = async () => {
        const token = new URL(window.location.href).searchParams.get('code');
        const res = axios.post(
            'https://kauth.kakao.com/oauth/token',
            {
                grant_type: 'authorization_code',
                client_id: `6a5dafa758e469d18292acc6fbca333b`,
                redirect_uri: `http://13.125.141.171/v1/auths/oauth/kakao`,
                code: token,
            },
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            }
        );
        return res;
    };

    useEffect(() => {
        getToken()
            .then((res) => {
                if (res) {
                    localStorage.setItem('token', JSON.stringify(res.data.access_token));
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return <></>;
}
