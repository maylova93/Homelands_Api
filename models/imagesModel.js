import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    tableName: 'images',  // Matcher database-tabellen
    timestamps: false
});


