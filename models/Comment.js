const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'article',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    // timestamps: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;