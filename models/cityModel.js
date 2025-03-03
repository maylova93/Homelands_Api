import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    population: {
        type: DataTypes.INTEGER
    }
}, { 
    timestamps: false 
});
