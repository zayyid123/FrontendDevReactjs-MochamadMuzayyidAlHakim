import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://my-json-server.typicode.com/zayyid123/FrontendDevReactjs-MochamadMuzayyidAlHakim",
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});