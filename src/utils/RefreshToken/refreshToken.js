// import { useContext } from "react";
// import UserContext from "../../store/Context";
import jwt_decode from "jwt-decode";
import axios from "axios";

const axiosJWT = axios.create({ withCredentials: true });

axiosJWT.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const date = new Date();
        const decodeToken = jwt_decode(user.accessTokenAuth);
        // console.log(decodeToken.exp <= date.getTime() / 1000);
        if (decodeToken.exp <= date.getTime() / 1000) {
            axios
                .post("/user/refresh")
                .then((res) => {
                    const refreshUser = { ...user, accessTokenAuth: res.data };
                    localStorage.setItem("user", JSON.stringify(refreshUser));
                    config.headers["token"] = "Bearer " + res.data;
                })
                .catch((err) => console.error("error" + err));
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosJWT;
