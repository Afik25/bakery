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
  async getByKeys(req, res) {
    try {
      const { articles_page, articles_rows } = req.params;
      // Calculate offset
      const offset = (parseInt(articles_page) - 1) * parseInt(articles_rows);

      const _categories = await Category.findAll();

      // Retreive orders with pagination
      const { rows, count } = await Article.findAndCountAll({
        limit: parseInt(articles_rows), // Limite du nombre d'éléments par page
        offset: offset, // Décalage (offset) des résultats
        order: [["title", "ASC"]], // created_at / updated_at
      });

      if (
        _categories == "" ||
        _categories == null ||
        rows == "" ||
        rows == null
      ) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No information available about Article.",
        });
      }
      let articlesArray = [];
      for (let i = 0; i < rows.length; i++) {
        const element = rows[i]?.category_id;
        let category = _categories.filter((x) => x.id === element);
        //
        articlesArray.push({
          category_title: category[0]?.title,
          category_id: rows[i]?.category_id,
          id: rows[i]?.id,
          code: rows[i]?.code,
          title: rows[i]?.title,
          price: rows[i]?.price,
          currency: rows[i]?.currency,
          threshold: rows[i]?.threshold,
          description: rows[i]?.description,
          thumbnail: rows[i]?.thumbnail,
          status: rows[i]?.status,
          updated_at: rows[i]?.updated_at,
          created_at: rows[i]?.created_at,
        });
      }

      const articlesSorted = articlesArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
      });

      const articles = articlesSorted;

      // Nombre total de pages
      const totalPages = Math.ceil(count / articles_rows);

      return res.status(200).json({
        status: true,
        length: articles.length,
        articles: articles, // Les résultats de la page demandée
        totalArticles: count, // Nombre total de categories
        totalPages: totalPages, // Nombre total de pages
        currentPage: articles_page, // Page actuelle
        articles_rows: articles_rows, // Taille de la page
      });
    } catch (error) {
      console.log({ "catch error get articles": error });
      return res
        .status(400)
        .json({ status: false, message: "catch error get articles" });
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
