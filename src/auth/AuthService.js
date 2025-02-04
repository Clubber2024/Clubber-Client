// src/auth/AuthService.js
import { customAxios } from '../config/axios-config';
import axios from 'axios';

// 로컬 스토리지 키 설정
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const IS_ADMIN_KEY = "isAdmin";

// 액세스 토큰 가져오기
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

// 리프레시 토큰 가져오기
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// 관리자 여부 가져오기
export const getIsAdmin = () => localStorage.getItem(IS_ADMIN_KEY);

// 토큰 저장
export const saveTokens = (accessToken, refreshToken, isAdmin = false) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(IS_ADMIN_KEY, isAdmin);
};

// 토큰 삭제 (로그아웃)
export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
};

// 액세스 토큰 갱신 요청
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");
				
		const endpoint = getIsAdmin() ? `https://dev.ssuclubber.com/api/v1/admins/refresh` : `https://dev.ssuclubber.com/api/v1/auths/refresh`;
        const response = await axios.post(endpoint, { token: refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        saveTokens(accessToken, newRefreshToken);
        return accessToken;
    } catch (error) {
        console.error("Failed to refresh access token", error);
        if (error.response?.status === 401) {
            clearTokens();
            window.location.href = "/login"; // 로그인 페이지로 이동
        }
        return null;
    }
};

// 요청 인터셉터 : 모든 요청에 액세스 토큰 추가
customAxios.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 : 액세스 토큰이 만료되었을 때 자동 갱신
let isRefreshing = false;

customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) return Promise.reject(error); // 무한 루프 방지
            
            isRefreshing = true;
            originalRequest._retry = true;
            
            const newAccessToken = await refreshAccessToken();
            isRefreshing = false;

            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return customAxios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

