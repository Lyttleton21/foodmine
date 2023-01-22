const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const food = sequelize.define('food', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
        name:{
        type: Sequelize.STRING,
        allowNull:false,
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull:false,
        },
        tags:{
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        favorite:{
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        star:{
            type: Sequelize.REAL,
            allowNull:false,
        },
        imageUrl:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        origin:{
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull:false,
        },
        cookTime:{
            type: Sequelize.STRING,
            allowNull:false,
        }
    }, {
        timestamps: false,
    });
    return food
}