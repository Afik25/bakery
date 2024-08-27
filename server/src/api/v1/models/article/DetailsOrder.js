const { Model, DataTypes } = require("sequelize");

class DetailsOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: DataTypes.INTEGER,
        article_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        discount_type: DataTypes.STRING,
        pay_from_discount: DataTypes.DOUBLE,
        total_price: DataTypes.DOUBLE,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "details_orders",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "details-order_order",
      allowNull: true,
    });
    this.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "details-order_article",
      allowNull: true,
    });
  }
}
module.exports = DetailsOrder;
