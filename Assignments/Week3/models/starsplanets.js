'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  models.StarsPlanets.belongsTo(models.Stars);
  models.StarsPlanets.belongsTo(models.Planets);
}
  }
  StarsPlanets.init({
    StarId: DataTypes.INTEGER,
    PlanetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StarsPlanets',
  });
  return StarsPlanets;
};