const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadFiles = require("../middlewares/uploadFiles");
const countries = require("../middlewares/countries.json");
const User = require("../api/v1/controllers/users/User");
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
router.get("/auth/refresh", verifyJWT, Login.refreshToken);
router.get("/auth/logout", verifyJWT, Login.logout);
//
// Category
router
  .get("/config/categories", Category.get)
  .post("/config/categories", Category.create);
//
// Article
router
  .get("/config/articles", Article.get)
  .post(
    "/config/articles",
    uploadFiles.upload.single("thumbnail"),
    Article.create
  );
//
// StockMovement
router
  .get("/stock/movements", StockMovement.get)
  .get("/stock/movements/inventory", StockMovement.getInventory)
  .get("/stock/movements/inventory/:article_id", StockMovement.getInventoryByArticleId)
  .post("/stock/movements", StockMovement.create);
//
// Orders
router
  .get("/orders", Order.get)
  .post("/orders", Order.create);
//
// User
router.post("/user", User.create).get("/user", User.get);
router
  .get("/user/key/:key", User.getByKey)
  .put("/user/key/:id", User.update)
  .delete("/user/key/:id", User.delete);
//
// Register
//
// router.post("/auth/register", Inscription.create);
// router.post("/auth/complete", verifyJWT, Inscription.complete);
// router.post("/auth/activation", verifyJWT, Inscription.activateCompletion);
//

module.exports = router;
