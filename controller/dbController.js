import express from 'express'
import sequelize from '../config/database.js';



export const dbController = express.Router();

 dbController.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.json({ message: "Database synced" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


