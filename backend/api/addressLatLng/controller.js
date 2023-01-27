const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const addressLatLng = require('../models/addressLatLng')(sequelize, Sequelize);
const Order = require('../models/order')(sequelize, Sequelize);

addressLatLng.belongsTo(Order);

addressLatLng.sync();

exports.addressLatLngController = {
    
}