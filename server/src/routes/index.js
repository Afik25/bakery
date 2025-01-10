const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadFiles = require("../middlewares/uploadFiles");
const countries = require("../middlewares/countries.json");
const User = require("../api/v1/controllers/users/User");
const Newsletter = require("../api/v1/controllers/users/Newsletter");
const Message = require("../api/v1/controllers/users/Message");
const Inscription = require("../api/v1/controllers/users/Inscription");
const Login = require("../api/v1/controllers/users/Login");
const Category = require("../api/v1/controllers/article/Category");
const Article = require("../api/v1/controllers/article/Article");
const StockMovement = require("../api/v1/controllers/article/StockMovement");
const Order = require("../api/v1/controllers/article/Order");
//
// root configure
router.get("/auth/config", User.rootConfigure);
//
// login
router.post("/auth/login", Login.login);
router.get("/auth/refresh", Login.refreshToken);
router.get("/auth/logout", Login.logout);
//
// Category
router
  .get("/config/categories/for/page", Category.get)
  .get(
    "/config/categories/:categories_page/:categories_rows",
    verifyJWT,
    Category.getByKeys
  )
  .post("/config/categories", verifyJWT, Category.create);
//
// Article
router
  .get("/config/articles/for/page", Article.get)
  .get(
    "/config/articles/:articles_page/:articles_rows",
    verifyJWT,
    Article.getByKeys
  )
  .post(
    "/config/articles",
    verifyJWT,
    uploadFiles.upload.single("thumbnail"),
    Article.create
  );
//
// StockMovement
router
  .get("/stock/movements/:operations_page/:operations_rows", verifyJWT, StockMovement.get)
  .get(
    "/stock/movements/inventory/:stocks_page/:stocks_rows",
    verifyJWT,
    StockMovement.getInventory
  )
  .get(
    "/stock/movements/inventory/:article_id",
    verifyJWT,
    StockMovement.getInventoryByArticleId
  )
  .post("/stock/movements", verifyJWT, StockMovement.create);
//
// Orders
router
  .get("/orders/dasboard", verifyJWT, Order.dashboard)
  .get("/orders", verifyJWT, Order.get)
  .get("/orders/:user_id/:order_page/:order_rows", verifyJWT, Order.get)
  .get("/orders/by/keys", verifyJWT, Order.getByKeys)
  .get("/orders/by/code", verifyJWT, Order.getByCode)
  .post("/orders", verifyJWT, Order.create)
  .post("/orders/for/page", Order.create)
  .patch("/orders/update/status/:status/:id", verifyJWT, Order.updateStatus);
//
// User
router
  .get("/users", verifyJWT, User.get)
  .get("/users/:users_page/:users_rows", verifyJWT, User.getByKeys)
  .post("/users/auth/register", verifyJWT, User.create)
  .patch("/users/auth/activation/:id/:status", verifyJWT, User.activation)
  .put("/users/auth/update", verifyJWT, User.update);
router
  .get("/user/key/:key", verifyJWT, User.getByKey)
  .put("/user/key/:id", verifyJWT, User.update)
  .delete("/user/key/:id", verifyJWT, User.delete);
//
// Newsletter
router
  .post("/on/subscription", Newsletter.create)
  .patch("/on/unsubscription", Newsletter.update);
//
// Message
router.post("/message/send", Message.create).get("/message/get", Message.get);
//
// Register
//
// router.post("/auth/register", Inscription.create);
// router.post("/auth/complete", verifyJWT, Inscription.complete);
// router.post("/auth/activation", verifyJWT, Inscription.activateCompletion);
//

module.exports = router;
