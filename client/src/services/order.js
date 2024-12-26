import axios from "../middlewares/http-common";
import { ORDERS, _ORDERS } from "../routes";

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
export function onGetOrders(
  user_id,
  orderPage,
  orderRows,
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(ORDERS + "/" + user_id + "/" + orderPage + "/" + orderRows, {
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
export function onCreateOrderForPage(data) {
  return new Promise(async (resolve, reject) => {
    await axios
      .post(_ORDERS, data, {
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
