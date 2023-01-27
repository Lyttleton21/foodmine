module.exports = (sequelize, DataTypes) => {
    const orderItem = sequelize.define('orderItem',{
        // food_id: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        // },
        // food_name: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        // },
        // food_imageUrl: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        // },
        // food_price: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        //     // items.food.price
        // },
        // food_total_price: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        //     // items.price
        // },
        // food_quantity: {
        //     type: DataTypes.RANGE(DataTypes.BIGINT)
        //     // items.quantity
        // }
        orderItems:{
            type : DataTypes.ARRAY(DataTypes.STRING)
        }
    }, 
    {
        timestamps: false
    });
    return orderItem;
}