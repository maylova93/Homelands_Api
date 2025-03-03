import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const estateTypesModel = sequelize.define('EstateTypes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'estate_types', 
    timestamps: false,
});


