/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    rowid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: true
    //  defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    updated_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'A'
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    locationtype: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'BOTH'
    },
    referenceid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    locationname: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    street: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'location'
  });
};
