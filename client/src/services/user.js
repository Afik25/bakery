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
export function onUpdateUser(axiosPrivate, data) {}
// newsletter
export function onSubscription(axiosPrivate, data) {
  const formData = {
    mail: data?.mail,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
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
export function onMessaging(axiosPrivate, data) {
  const formData = {
    firstname: data?.firstname,
    lastname: data?.lastname,
    subject: data?.subject,
    message: data?.message,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
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

