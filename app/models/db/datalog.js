/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('datalog', {
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
      deviceid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'devicedetails',
          key: 'rowid'
        }
      },
      edgeid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'edgecontrolers',
          key: 'rowid'
        }
      },
      userid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'user',
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
      name: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      mode_control: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: 'ACTION'
      },
      device_type: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true
      },
      value_a: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      value_b: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      value_i: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      value_j: {
        type: DataTypes.DECIMAL,
        allowNull: true
      }
    }, {
      tableName: 'datalog'
    });
  };
  