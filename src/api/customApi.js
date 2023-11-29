import axios from 'axios';


let localToken = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiMDAzIiwibmFtZSI6Iu2Zjeq4uOuPmSIsInN1YiI6ImVlYWQ5NWVlLWE2ZTgtNDk4NS05MTNjLTE0OGI4ZDYyNzljMCIsImV4cCI6MTcwMDYyNDg4MSwiaWF0IjoxNzAwNjI0NTgxfQ.kXe_hRdA3NkkQlu1AUZDMDguyxRHQLb0jtPm3gdAG9MvDWoPEOOexm9uOa8hWLqatAswJCORG3bLnEEJaVtFcg';

// axios의 기본 헤더에 토큰 설정
axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;

axios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken"); // 웹에서는 localStorage를 사용
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터
axios.interceptors.response.use(null, async (error) => {
    const originalRequest = error.config;
    if (error && error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken"); // 웹에서는 localStorage를 사용

        try {
            const response = await axios.post('http://27.96.135.229:8080/api/members/v1/token', { refreshToken });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken); // 웹에서는 localStorage를 사용
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
        } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            return Promise.reject(error); // 원래의 오류 반환
        }

    }
    return Promise.reject(error);
});

const customAxios = axios.create({
    baseURL: 'http://27.96.135.229:8080',
    headers: {
        'content-type': 'application/json',
    },
});

export default customAxios;