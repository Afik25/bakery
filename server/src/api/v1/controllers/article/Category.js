const Category = require("../../models/article/Category");

module.exports = {
  async create(req, res) {
    try {
      const { title, description } = req.body;

      const check_category = await Category.findOne({
        where: { title: title.toLowerCase() },
      });

      if (check_category) {
        return res.status(200).json({
          status: false,
          message: "La catégorie existe déjà.",
        });
      }

      const category = await Category.create({
        title: title.toLowerCase(),
        description,
      });

      if (category) {
        return res.status(200).json({
          status: true,
          message: `Category : ${title.toUpperCase()} saved successfully.`,
          category,
        });
      }
      return res.status(400).json({
        status: false,
        message: "Category not saved. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error create Category : ": error });
    }
  },
  async get(req, res) {
    try {
      const { rows, count } = await Category.findAndCountAll({
        order: [["title", "ASC"]],
      });

      if (rows == "" || rows == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available about categories.",
        });
      }

      let categoriesArray = [];
      for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        //
        categoriesArray.push({
          id: element?.id,
          title: element?.title,
          description: element?.description,
          status: element?.status,
          updated_at: element?.updated_at,
          created_at: element?.created_at,
        });
      }

      const categoriesSorted = categoriesArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
      });
      const categories = categoriesSorted;

      return res.status(200).json({
        status: true,
        length: categories.length,
        categories: categories, // Les résultats de la page demandée
        totalCategories: count, // Nombre total de categories
      });
    } catch (error) {
      console.log({ "catch error get categories": error });
      return res
        .status(400)
        .json({ status: false, message: "catch error get categories" });
    }
  },
  async getByKeys(req, res) {
    try {
      const { categories_page, categories_rows } = req.params;

      // Calculate offset
      const offset =
        (parseInt(categories_page) - 1) * parseInt(categories_rows);

      // Retreive orders with pagination
      const { rows, count } = await Category.findAndCountAll({
        limit: parseInt(categories_rows), // Limite du nombre d'éléments par page
        offset: offset, // Décalage (offset) des résultats
        order: [["title", "ASC"]], // created_at / updated_at
      });

      if (rows == "" || rows == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available about categories.",
        });
      }

      let categoriesArray = [];
      for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        //
        categoriesArray.push({
          id: element?.id,
          title: element?.title,
          description: element?.description,
          status: element?.status,
          updated_at: element?.updated_at,
          created_at: element?.created_at,
        });
      }

      const categoriesSorted = categoriesArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
      });
      const categories = categoriesSorted;

      // Nombre total de pages
      const totalPages = Math.ceil(count / categories_rows);

      return res.status(200).json({
        status: true,
        length: categories.length,
        categories: categories, // Les résultats de la page demandée
        totalCategories: count, // Nombre total de categories
        totalPages: totalPages, // Nombre total de pages
        currentPage: categories_page, // Page actuelle
        categories_rows: categories_rows, // Taille de la page
      });
    } catch (error) {
      console.log({ "catch error get categories": error });
      return res
        .status(400)
        .json({ status: false, message: "catch error get categories" });
    }
  },
  async update(req, res) {
    try {
      const { title, description } = req.body;
      const { id } = req.params;

      const category = await Category.update(
        { title, description },
        { where: { id: id } }
      );

      if (category) {
        return res.status(200).json({
          status: true,
          message: "Category updated.",
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
