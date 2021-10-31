const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(signinPw) {
    return bcryptjs.compareSync(signinPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2,36],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
        // is: [/^[a-z]+$/i],
        // msg: "Passwords must be a minimum of 8 characters in length."
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcryptjs.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;