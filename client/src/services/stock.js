import { STOCKS } from "../routes";

export function onGetStocks(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(STOCKS + "/inventory", {
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
export function onGetStocksByArticleId(axiosPrivate, signal, article_id) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(STOCKS + "/inventory/" + article_id, {
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
export function onGetStockMovements(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(STOCKS, {
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
export function onCreateStockMovement(axiosPrivate, data) {
  const dates = new Date();
  const formData = {
    article_id: data?.article_id,
    dates,
    type: data?.type,
    quantity: data?.quantity,
    description: data?.description,
  };
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(STOCKS, formData, {
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
export function onUpdateStockMovement(axiosPrivate, data) {}