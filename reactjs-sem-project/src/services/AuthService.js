import axios from "axios";
import MyLocalStorageService from "./MyLocalStorageService";

export const SERVER_URL = 'http://localhost:9090';

const login = (username, password) => {
    return axios.post(SERVER_URL + '/login', {
        username,
        password
    }).then((response) => {
        console.log(response);
        console.log(response.data.token);
        if (response.data.token) {
            MyLocalStorageService.saveToken(response.data.token);

        }
    })
};

const logout = () => {
    MyLocalStorageService.signOut();
}

const getCurrentUserInfo = () => {
    return axios.get(SERVER_URL + "/info", {
        headers: authHeader()
    }).then((response) => response.data);
}

const getCurrentUserEntries = () => {
    return axios.get(SERVER_URL + "/entries", {
        headers: authHeader()
    }).then((response) => response.data);
}

const deleteSelectedEntry = (entryId) => {
    return axios.delete(SERVER_URL + "/entries/delete/" + entryId, {
        headers: authHeader()
    })
}

const addNewEntry = (entry) => {
    return axios.post(SERVER_URL + "/entries", entry, {
        headers: authHeader()
    }).then((response) => response.data);
}

const authHeader = () => {
    const user = MyLocalStorageService.getToken();
    if (user) {
        return {
            Authorization: "Bearer " + user,
            Accept: "application/json",
            "Content-type": "application/json"
        };
    } else {
        return null;
    }
}

const AuthService = {
    login,
    logout,
    getCurrentUserInfo,
    getCurrentUserEntries,
    deleteSelectedEntry,
    addNewEntry
};

export default AuthService;
