import sequelize from "../config/sequelizeConfig.js"
import { DataTypes, Model } from "sequelize"

export default class cityModel extends Model {}

cityModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Zipcode is required" },
        len: { args: [4], msg: "Zipcode must be 4 characters long" },
        isNumeric: { msg: "Zipcode must only contain numbers" }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [2, 50], msg: "City name must be between 2 and 50 characters" }
      }
    }
  },
  {
    sequelize,
    modelName: "city",
    underscored: true,
  }
)