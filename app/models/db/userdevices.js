/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userdevices', {
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
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'rowid'
      }
    },
    deviceid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'devicedetails',
        key: 'rowid'
      }
    },
    access_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    userlocation: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'rowid'
      }
    },
    devicelocation: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'rowid'
      }
    }
  }, {
    tableName: 'userdevices'
  });
};
