'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  models.Stars.belongsTo(models.Galaxy);

  models.Stars.belongsToMany(models.Planets, {
    through: models.StarsPlanets
  });
}
 
  }
  Stars.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Stars',
  });
  return Stars;
};