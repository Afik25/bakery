import axios from "../middlewares/http-common";
import { LOGINS } from "../routes";

export function login(data) {
  //
  const dates = new Date();
  const location = "N/A";
  const latitude = "N/A";
  const longitude = "N/A";
  const device = "PC";
  const ip_address = "N/A";
  const operating_system = "N/A";
  const navigator = "N/A";
  //
  const _data = {
    mail: data.mail,
    password: data.password,
    dates: dates,
    location: location,
    latitude: latitude,
    longitude: longitude,
    device: device,
    ip_address: ip_address,
    operating_system: operating_system,
    navigator: navigator,
  };
  return new Promise(async (resolve, reject) => {
    await axios
      .post(LOGINS, _data, {
        headers: { "Content-Type": "application/json" },
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
// changing password
export function onChangingPassword(axiosPrivate, data) {
  const formData = {
    old_password: data?.old_password,
    new_password: data?.new_password,
    user_id: data?.user_id,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(LOGINS + "/change/password", formData, {
        headers: { "Content-Type": "application/json" },
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
