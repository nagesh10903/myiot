/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group', {
    rowid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    grouptype: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    groupcategory: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'group'
  });
};
