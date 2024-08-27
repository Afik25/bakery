const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        dates: DataTypes.DATE,
        code: DataTypes.STRING,
        total_quantity: DataTypes.INTEGER,
        discount_type: DataTypes.STRING,
        discount: DataTypes.INTEGER,
        pay_from_discount: DataTypes.DOUBLE,
        pay_mode: DataTypes.STRING,
        customer: DataTypes.STRING,
        status: DataTypes.STRING,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "orders",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "order_user",
      allowNull: false,
    });
    this.hasMany(models.DetailsOrder, {
      foreignKey: "order_id",
      as: "order_details-order",
      allowNull: false,
    });
  }
}
module.exports = Order;
