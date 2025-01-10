import axios from "../middlewares/http-common";
import { USERS } from "../routes";

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
export function onGetUsersByRange(usersPage, usersRows, axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(USERS + "/" + usersPage + "/" + usersRows, {
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
  const formData = {
    firstname: data?.firstname,
    lastname: data?.lastname,
    gender: data?.gender,
    telephone: data?.telephone,
    mail: data?.mail,
    sys_role: data?.sys_role,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(USERS + "/auth/register", formData, {
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
export function onUpdateUser(data, axiosPrivate) {
  const formData = {
    id: data?.id,
    firstname: data?.firstname,
    lastname: data?.lastname,
    gender: data?.gender,
    telephone: data?.telephone,
    mail: data?.mail,
    sys_role: data?.sys_role,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(USERS + "/auth/update", formData, {
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
export function onActivationUser(data, axiosPrivate) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .patch(USERS + "/auth/activation/" + data?.id + "/" + data?.status, {
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
// newsletter
export function onSubscription(data) {
  const formData = {
    mail: data?.mail,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axios
      .post("/on/subscription", formData, {
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
export function onUnSubscription(axiosPrivate, data) {
  const formData = {
    mail: data?.mail,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post("/on/unsubscription", formData, {
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
// message
export function onMessaging(data) {
  const formData = {
    firstname: data?.firstname,
    lastname: data?.lastname,
    subject: data?.subject,
    message: data?.message,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axios
      .post("/message/send", formData, {
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
