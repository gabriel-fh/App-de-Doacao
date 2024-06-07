import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const base_url = "https://fc86-2804-388-6077-3c10-4147-edba-2166-9ddc.ngrok-free.app/api";

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
