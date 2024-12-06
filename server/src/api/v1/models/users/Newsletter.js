const { Model, DataTypes } = require("sequelize");

class Newsletter extends Model {
  static init(sequelize) {
    super.init(
      {
        mail: DataTypes.STRING,
        status: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "newsletters",
      }
    );
  }
}
module.exports = Newsletter;
