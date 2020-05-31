/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    rowid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_dt: {
      type: DataTypes.DATE,
      defaultValue:sequelize.NOW,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_dt: {
      type: DataTypes.DATE,
      defaultValue:sequelize.NOW,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'A'
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    fname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(72),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    usertype: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    usercategory: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    adminid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
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
    }
  }, {
    tableName: 'user'
  });
};
