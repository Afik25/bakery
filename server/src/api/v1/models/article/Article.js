const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        category_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        currency: DataTypes.STRING,
        threshold: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        thumbnail: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "articles",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "article_category",
      allowNull: true,
    });
    this.hasMany(models.StockMovement, {
      foreignKey: "article_id",
      as: "article_stock-movement",
      allowNull: true,
    });
    this.hasMany(models.DetailsOrder, {
      foreignKey: "article_id",
      as: "article_details-order",
      allowNull: true,
    });
  }
}
module.exports = Article;
