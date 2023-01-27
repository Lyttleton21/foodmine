const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const User = require('../models/user')(sequelize, Sequelize);
const Order = require('../models/order')(sequelize, Sequelize);
// const orderItem = require('../models/orderItem')(sequelize, Sequelize);

Order.belongsTo(User);

Order.sync();

exports.orderController = {
    
}