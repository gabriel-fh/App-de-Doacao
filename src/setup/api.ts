import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const base_url = "https://790e-2804-14d-5c87-4a0d-65a9-49e7-f8d8-85f2.ngrok-free.app/api";

const api = Axios.create({
    baseURL: base_url,
});


export default api;

// export const authedApi = Axios.create({
//     baseURL: base_url,
// })


// authedApi.interceptors.request.use(
//     async (config) => {
//         const authDataSerialized = await AsyncStorage.getItem("@Baoo:AuthData");
//         const _authData:  = JSON.parse(authDataSerialized);
//         config.headers["Authorization"] = `Bearer ${_authData.token}`;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
