const Category = require("../../models/article/Category");
//

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
      const _categories = await Category.findAll();
      if (_categories == "" || _categories == null) {
        return res.status(200).json({
          status: true,
          length: 0,
          message: "No information available about categories.",
        });
      }

      const categoriesSorted = _categories.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
      });
      const categories = categoriesSorted;

      return res
        .status(200)
        .json({ status: true, length: categories.length, categories });
    } catch (error) {
      console.log({ "catch error get categories ": error });
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
