import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const base_url = "http://167.172.158.244/api";

const api = Axios.create({
    baseURL: base_url,
});

export default api;

export const authedApi = Axios.create({
    baseURL: base_url,
})

authedApi.interceptors.request.use(
    async (config) => {
        const authDataSerialized = await AsyncStorage.getItem("@app-doacao:AuthToken");
        const _authData = JSON.parse(authDataSerialized);
        config.headers["Authorization"] = `Bearer ${_authData.token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
