import { ORDERS } from "../routes";

export function onGetDashboard(axiosPrivate, signal, parameters) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(
        ORDERS + "/dasboard",
        { params: parameters },
        {
          signal: signal,
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onGetOrders(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(ORDERS, {
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
export function onGetOrdersByKeys(axiosPrivate, signal, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(
        ORDERS + "/by/keys",
        { params: data },
        {
          signal: signal,
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onGetOrdersByCode(axiosPrivate, signal, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(
        ORDERS + "/by/code",
        { params: data },
        {
          signal: signal,
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onCreateOrder(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(ORDERS, data, {
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
export function onUpdateStatusOrder(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .patch(
        ORDERS + "/update/status/" + data?.order_status + "/" + data?.order_id,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
