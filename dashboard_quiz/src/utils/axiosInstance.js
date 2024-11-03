import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "../config";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import { logout } from "../services/auth";
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (req) => {
  try {
    let quiz_accessToken = cookies.get("quiz_accessToken")
      ? cookies.get("quiz_accessToken")
      : null;

    // console.log({ quiz_accessToken });
    req.headers.Authorization = `${quiz_accessToken}`;

    const accessToken = jwtDecode(quiz_accessToken);

    const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    logout();

    // const response = await axios.post(`${baseURL}/auth/cpd_refreshToken`, {
    //   refreshToken: cookies.get("cpd_refreshToken"),
    // });

    // let { token } = response.data?.data;

    // cookies.set("quiz_accessToken", token?.accessToken, { path: "/" });
    // cookies.set("cpd_refreshToken", token?.refreshToken, { path: "/" });

    // req.headers.Authorization = `Bearer ${token?.accessToken}`;

    return req;
  } catch (error) {
    throw new Error(error);
  }
});

export default axiosInstance;
