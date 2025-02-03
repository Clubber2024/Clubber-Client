import { customAxios } from '../../config/axios-config';

export const handleAuth = async (navigate, retryLogout = false) => {
    const isAdmin = localStorage.getItem('isAdmin');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const endpoint = isAdmin === "true" || isAdmin
            ? `/v1/admins/refresh`
            : `/v1/auths/refresh`;

        const res = await customAxios.post(
            endpoint,
            {},
            {
                headers: { Authorization: `Bearer ${refreshToken}` },
            }
        );

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('인증 실패:', error);

        if (!retryLogout) {
            localStorage.clear();
            navigate('/login');
        }

        return null;
    }
};
