const sequelize = require("sequelize");
const database = require("../config/database");
const connection = new sequelize(database);
//
// Admin
const User = require("../api/v1/models/users/User");
const Newsletter = require("../api/v1/models/users/Newsletter");
const Message = require("../api/v1/models/users/Message");
const Login = require("../api/v1/models/users/Login");
const Inscription = require("../api/v1/models/users/Inscription");
const Category = require("../api/v1/models/article/Category");
const Article = require("../api/v1/models/article/Article");
const Order = require("../api/v1/models/article/Order");
const DetailsOrder = require("../api/v1/models/article/DetailsOrder");
const StockMovement = require("../api/v1/models/article/StockMovement");
//
//
// Models connection links
//
User.init(connection);
Newsletter.init(connection);
Message.init(connection);
Login.init(connection);
Inscription.init(connection);
Category.init(connection);
Article.init(connection);
Order.init(connection);
DetailsOrder.init(connection);
StockMovement.init(connection);
//

module.exports = connection;
