/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deviceposition', {
    rowid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: true
     // defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    locationid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'rowid'
      }
    },
    referenceid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'rowid'
      }
    },
    floor: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    block: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    room: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    roomtype: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hor_pos: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    ver_pos: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    type_pos: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'deviceposition'
  });
};
