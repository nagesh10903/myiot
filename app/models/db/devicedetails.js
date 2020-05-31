/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devicedetails', {
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
    devicename: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    devicetype: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    devicecategory: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    devicemode: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    positionid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'deviceposition',
        key: 'rowid'
      }
    },
    locationid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'location',
        key: 'rowid'
      }
    },
    ip: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    mac: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tech_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tech_model: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    value_a: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    value_i: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    value_j: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    controler: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    controler_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'edgecontrolers',
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
    connectivity: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'devicedetails'
  });
};
