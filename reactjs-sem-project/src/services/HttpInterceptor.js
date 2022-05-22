import axios from "axios";
import updateHeaderInterceptor from "./updateHeader";

const SERVER_URL = 'http://localhost:9090';

const httpClient = axios.create({
    baseURL: SERVER_URL,
});

updateHeaderInterceptor(httpClient);

export default httpClient;
