import { axiosPrivate } from "../../../middlewares/http-common";
import useAuth from "./useAuth";
import { LOGOUT } from "../../../routes";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const dates = new Date();
      const data = { updated_at: dates };
      const result = await axiosPrivate.get(
        LOGOUT,
        { params: data },
        {
          withCredentials: true,
        }
      );
      console.log({ "result logout": result });
      setAuth({});
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
export default useLogout;
