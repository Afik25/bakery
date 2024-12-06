import axios from "../../../middlewares/http-common";
import useAuth from "./useAuth";
import { REFRESH } from "../../../routes/index";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(REFRESH, {
      withCredentials: true,
    });
    // console.log({ "from useRefreshToken check response ": response });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response?.data?.accessToken);
      return {
        ...prev,
        roles: response?.data?.roles,
        accessToken: response?.data?.accessToken,
      };
    });
    return response?.data?.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
