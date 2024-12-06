const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        subject: DataTypes.STRING,
        content: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "messages",
      }
    );
  }
}
module.exports = Message;
