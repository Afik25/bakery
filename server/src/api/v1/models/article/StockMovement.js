const { Model, DataTypes } = require("sequelize");

class StockMovement extends Model {
  static init(sequelize) {
    super.init(
      {
        article_id: DataTypes.INTEGER,
        dates: DataTypes.DATE,
        type: DataTypes.STRING, // in or out
        quantity: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "stock_movements",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "stock-movement_article",
      allowNull: true,
    });
  }
}
module.exports = StockMovement;
