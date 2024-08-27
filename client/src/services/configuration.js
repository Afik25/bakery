import { CATEGORY, ARTICLES } from "../routes";
import { onHandleFile } from "../utils/utils";

// CATEGORIES
//
export function onGetCategories(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(CATEGORY, {
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
export function onCreateCategory(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(CATEGORY, data, {
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
export function onUpdateCategory(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(CATEGORY, data, {
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
export function onActivationCategory(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(CATEGORY + "/activation", data, {
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
//
// ARTICLES
//
export function onGetArticles(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(ARTICLES, {
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
export function onCreateArticle(axiosPrivate, data) {
  const formData = new FormData();
  const newFile = data?.thumbnail[0]
    ? onHandleFile(
        data?.thumbnail[0],
        `article-${data?.thumbnail[0]?.name?.split(".")[0]}-${Date.now()}`
      )
    : "";
  formData.append("category_id", data?.category_id);
  formData.append("thumbnail", newFile);
  formData.append("title", data?.title);
  formData.append("price", data?.price);
  formData.append("currency", data?.currency);
  formData.append("threshold", data?.threshold);
  formData.append("description", data?.description);
  //
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(ARTICLES, formData, {
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
export function onUpdateArticle(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(ARTICLES, data, {
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
export function onActivationArticle(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .put(ARTICLES + "/activation", data, {
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
