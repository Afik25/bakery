import { REGISTER, USERS } from "../routes";
import { onHandleFile } from "../utils/utils";

export function onGetUsers(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(USERS, {
        signal: signal,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onCreateUser(axiosPrivate, data) {
  const dates = new Date();
  const location = "N/A";
  const latitude = "N/A";
  const longitude = "N/A";
  const device = "PC";
  const ip_address = "N/A";
  const operating_system = "N/A";
  const navigator = "N/A";
  //
  const formData = new FormData();
  const newFile = data?.thumbnail[0]
    ? onHandleFile(
        data?.thumbnail[0],
        `user-${data?.thumbnail[0]?.name?.split(".")[0]}-${Date.now()}`
      )
    : "";
  formData.append("id", data?.id);
  formData.append("thumbnail", newFile);
  formData.append("firstname", data?.firstname);
  formData.append("lastname", data?.lastname);
  formData.append("gender", data?.gender);
  formData.append("telephone", data?.telephone);
  formData.append("mail", data?.mail);
  formData.append("birth", data?.birth);
  formData.append("birth_location", data?.birth_location);
  formData.append("sys_role", data?.sys_role);
  formData.append("department_id", data?.department_id);
  formData.append("role_id", data?.role_id);
  formData.append("dates", dates);
  formData.append("location", location);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("device", device);
  formData.append("ip_address", ip_address);
  formData.append("operating_system", operating_system);
  formData.append("navigator", navigator);
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onUpdateUser(axiosPrivate, data) {}
