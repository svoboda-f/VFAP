import MyLocalStorageService from "./MyLocalStorageService";

const updateHeaderInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use((config) => {
        const jwtToken = "Bearer " + MyLocalStorageService.getToken();
        config.headers["Authorization"] = jwtToken;
        return config;
    }, (error) => {
        console.log("UpdateHeaderInterceptor-Error",error)
    });
};

export default updateHeaderInterceptor;
