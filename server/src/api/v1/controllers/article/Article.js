const Article = require("../../models/article/Article");
const Category = require("../../models/article/Category");
//
const { Op } = require("sequelize");
const uuid = require("uuid");

module.exports = {
  async create(req, res) {
    try {
      const { category_id, title, price, currency, threshold, description } =
        req.body;
      const thumbnail = req?.file?.filename || "";

      const check_article = await Article.findOne({
        where: { title: title.toLowerCase() },
      });
      if (check_article) {
        return res.status(200).json({
          status: false,
          message: "The Article exists already.",
        });
      }
      const countArticle = await Article.count({});
      const code =
        "A-" +
        new Date().getFullYear() +
        (new Date().getMonth() + 1) +
        (new Date().getDay() + 1) +
        new Date().getMilliseconds() +
        (countArticle + 1);
      const article = await Article.create({
        category_id,
        code,
        title: title.toLowerCase(),
        price,
        currency,
        threshold,
        description,
        thumbnail,
      });
      if (article) {
        return res.status(201).json({
          status: true,
          message: `Article ${title.toUpperCase()} saved successfully.`,
          article,
        });
      }
      return res.status(400).json({
        status: false,
        message: "Article not saved. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error on create Article : ": error });
      return res.status(400).json({
        status: false,
        message: "catch error on create Article",
        error,
      });
    }
  },
  async get(req, res) {
    try {
      const _categories = await Category.findAll();
      const _articles = await Article.findAll();
      if (_articles == "" || _articles == null) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No information available about Article.",
        });
      }
      let articlesArray = [];
      for (let i = 0; i < _articles.length; i++) {
        const element = _articles[i]?.category_id;
        let category = _categories.filter((x) => x.id === element);
        //
        articlesArray.push({
          category_title: category[0]?.title,
          category_id: _articles[i]?.category_id,
          id: _articles[i]?.id,
          code: _articles[i]?.code,
          title: _articles[i]?.title,
          price: _articles[i]?.price,
          currency: _articles[i]?.currency,
          threshold: _articles[i]?.threshold,
          description: _articles[i]?.description,
          thumbnail: _articles[i]?.thumbnail,
          status: _articles[i]?.status,
          updated_at: _articles[i]?.updated_at,
          created_at: _articles[i]?.created_at,
        });
      }

      const articlesSorted = articlesArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
      });

      const articles = articlesSorted;

      return res
        .status(200)
        .json({ status: true, length: articles.length, articles });
    } catch (error) {
      console.log({ "catch error get articles ": error });
    }
  },
  async update(req, res) {
    try {
      const { telephone, address } = req.body;
      const { id } = req.params;

      const entity = await Article.update(
        { telephone, address },
        { where: { id: id } }
      );

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: "Extension updated.",
          entity,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
  async enabled(req, res) {
    try {
      const { stat, id } = req.params;

      const entity = await Article.update(
        { status: stat == 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: `Extension ${stat == 1 ? "Disabled" : "Enabled"}.`,
          entity,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
};
