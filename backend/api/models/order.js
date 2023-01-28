const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        // addressLatLng: {
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     allowNull:true,
        // },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        // items: {
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     allowNull:true
        // },
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['new', 'payed', 'shipped', 'cancelled', 'Refunded'],
            defaultValue: 'new'
        }
    }, {
        timestamps: true
      });

      return order;
}