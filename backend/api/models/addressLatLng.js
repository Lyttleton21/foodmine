const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const addressLatLng = sequelize.define('addressLatLng', {
        // lat: {
        //     type: DataTypes.REAL,
        //     allowNull: false
        // },
        // lng: {
        //     type: DataTypes.REAL,
        //     allowNull: false
        // }
        addressLatLngs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        }
    }, 
    {
        timestamps: false
    });
    return addressLatLng;
}