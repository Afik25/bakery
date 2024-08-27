const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "categories",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Article, {
      foreignKey: "category_id",
      as: "category_article",
      allowNull: true,
    });
  }
}
module.exports = Category;
