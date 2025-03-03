const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER
    }
}, { timestamps: false });

module.exports = City;
