const StockMovement = require("../../models/article/StockMovement");
const Category = require("../../models/article/Category");
const Article = require("../../models/article/Article");
const Order = require("../../models/article/Order");
const DetailsOrder = require("../../models/article/DetailsOrder");
const { Sequelize } = require("sequelize");
//

module.exports = {
  async create(req, res) {
    try {
      const { article_id, dates, type, quantity, description } = req.body;

      const stock = await StockMovement.create({
        article_id,
        dates,
        type,
        quantity,
        description,
      });

      if (stock) {
        return res.status(200).json({
          status: true,
          message: `${type.toUpperCase()} en stock : operation saved successfully.`,
          stock,
        });
      }
      return res.status(400).json({
        status: false,
        message: `${type.toUpperCase()} en stock : operation failed.`,
      });
    } catch (error) {
      console.log({ "catch error create StockMovement : ": error });
    }
  },
  async get(req, res) {
    try {
      const articles = await Article.findAll();
      const _stockMovements = await StockMovement.findAll();
      if (_stockMovements == "" || _stockMovements == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available about movements in stock.",
        });
      }

      let stockMovementsArray = [];
      for (let i = 0; i < _stockMovements.length; i++) {
        const element = _stockMovements[i]?.article_id;
        let _article = articles.filter((item, _) => item?.id === element);
        stockMovementsArray.push({
          article_title: _article[0]?.title,
          article_code: _article[0]?.code,
          article_thumbnail: _article[0]?.thumbnail,
          id: _stockMovements[i]?.id,
          article_id: _stockMovements[i]?.article_id,
          dates: _stockMovements[i]?.dates,
          type: _stockMovements[i]?.type,
          quantity: _stockMovements[i]?.quantity,
          description: _stockMovements[i]?.description,
          status: _stockMovements[i]?.status,
          updated_at: _stockMovements[i]?.updated_at,
          created_at: _stockMovements[i]?.created_at,
        });
      }

      const stockMovementsSorted = stockMovementsArray.sort(function (a, b) {
        if (a.created_at < b.created_at) {
          return -1;
        }
      });
      const stockMovements = stockMovementsSorted.reverse();

      return res
        .status(200)
        .json({ status: true, length: stockMovements.length, stockMovements });
    } catch (error) {
      console.log({ "catch error get StockMovements ": error });
    }
  },
  async getInventory(req, res) {
    try {
      const articles = await Article.findAll();
      const _distinctArticles = await StockMovement.findAll({
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("article_id")), "article_id"],
        ],
        group: ["article_id"],
      });
      //
      if (_distinctArticles == "" || _distinctArticles == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available about state of stock.",
        });
      }
      //
      let stockStateArray = [];
      //
      for (let i = 0; i < _distinctArticles.length; i++) {
        const element = _distinctArticles[i]?.article_id;
        let _article = articles.filter((item, _) => item?.id === element);
        //
        const dates = await StockMovement.findAll({
          where: { article_id: element },
          order: [["dates", "DESC"]],
          limit: 1,
        });
        const _total = await StockMovement.findAll({
          where: { article_id: element },
          attributes: [
            "type",
            // [Sequelize.fn("max", Sequelize.col("dates")), "dates"],
            [Sequelize.fn("SUM", Sequelize.col("quantity")), "total"],
          ],
          group: ["type"],
          raw: true,
        });
        const stockState =
          _total.length > 1
            ? _total[0]?.total - _total[1]?.total
            : _total[0]?.type == "entrée"
            ? _total[0]?.total
            : 0 - _total[0]?.total;
        //
        stockStateArray.push({
          dates: dates[0]?.dates,
          article_id: element,
          article_title: _article[0]?.title,
          article_code: _article[0]?.code,
          article_thumbnail: _article[0]?.thumbnail,
          article_threshold: _article[0]?.threshold,
          article_price: _article[0]?.price,
          article_currency: _article[0]?.currency,
          stockState: stockState,
        });
      }
      const articlesStocksSorted = stockStateArray.sort(function (a, b) {
        if (a.article_title < b.article_title) {
          return -1;
        }
      });
      const articlesStocks = articlesStocksSorted;
      return res.status(200).json({
        status: true,
        length: articlesStocks.length,
        articlesStocks,
      });
    } catch (error) {
      console.log({ "catch error get StockMovements Inventory ": error });
    }
  },
  async getInventoryByArticleId(req, res) {
    try {
      const { article_id } = req.params;
      //
      const _total = await StockMovement.findAll({
        where: { article_id: article_id },
        attributes: [
          "type",
          [Sequelize.fn("SUM", Sequelize.col("quantity")), "total"],
        ],
        group: ["type"],
        raw: true,
      });
      const stockState =
        _total.length > 1
          ? _total[0]?.total - _total[1]?.total
          : _total[0]?.type == "entrée"
          ? _total[0]?.total
          : 0 - _total[0]?.total;
      //
      return res.status(200).json({
        status: true,
        article_id,
        stockState,
      });
    } catch (error) {
      console.log({ "catch error get StockMovements Inventory ": error });
    }
  },
  async update(req, res) {
    try {
      const { title, description } = req.body;
      const { id } = req.params;

      const stockMovement = await StockMovement.update(
        { title, description },
        { where: { id: id } }
      );

      if (stockMovement) {
        return res.status(200).json({
          status: true,
          message: "StockMovement updated.",
          stockMovement,
        });
      }
      return res.status(400).json({
        status: false,
        message: "StockMovement not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update StockMovement ": error });
    }
  },
  async enabled(req, res) {
    try {
      const { stat, id } = req.params;

      const category = await Category.update(
        { status: stat == 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (category) {
        return res.status(200).json({
          status: true,
          message: `Category ${stat == 1 ? "Disabled" : "Enabled"}.`,
          category,
        });
      }
      return res.status(400).json({
        status: false,
        message: "Category not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update Category ": error });
    }
  },
};
