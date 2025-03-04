import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const staffModel = sequelize.define('Staff', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,  
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true  
        }
    }
}, { 
    tableName: 'staff', 
    timestamps: false
});
