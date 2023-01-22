const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            isEmail: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        }
    }, {
        timestamps: true,
        paranoid: true
      });
      return User;
}