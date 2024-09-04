import axios from 'axios';

// export const URL = 'http://localhost:3000';
export const URL = 'http://13.125.141.171:8080';
axios.defaults.withCredentials = true;

export const customAxios = axios.create({
    baseURL: URL,
    withCredentials: true, // withCredentials를 true로 설정하여 CORS 요청 시 쿠키를 포함합니다
});

customAxios.interceptors.request.use(
    //axios 요청 직전에 발생하는 함수
    function (config) {
        return config;
    },
    //axios 요청 에러나면 발생하는 함수
    function (error) {
        return Promise.reject(error);
    }
);
customAxios.interceptors.response.use(
    //axios 올바른 response가오면 발동하는 함수
    function (response) {
        return response;
    },

    //에러 메시지가 response되면 발동되는 함수
    async function (error) {
        return Promise.reject(error);
    }
);
