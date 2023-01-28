module.exports = (sequelize, DataTypes) => {
    const orderItem = sequelize.define('orderItem',{
        food_id: {
            type: DataTypes.STRING
        },
        food_name: {
            type:  DataTypes.STRING
        },
        food_imageUrl: {
            type:  DataTypes.STRING
        },
        food_price: {
            type:  DataTypes.INTEGER
            // items.food.price
        },
        food_total_price: {
            type:  DataTypes.INTEGER
            // items.price
        },
        food_quantity: {
            type:  DataTypes.INTEGER
            // items.quantity
        }
    }, 
    {
        timestamps: false
    });
    return orderItem;
}