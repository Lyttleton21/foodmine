const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const orderItem = require('../models/orderItem')(sequelize, Sequelize);
const Order = require('../models/order')(sequelize, Sequelize);

orderItem.belongsTo(Order);

orderItem.sync();

exports.orderItemController = {
    
}
