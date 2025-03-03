import express from 'express';
import sequelize from '../config/sequelizeConfig.js';
import { seedFromCsv } from '../utils/seedUtils.js';
import userModel from '../models/userModel.js';
import cityModel from '../models/cityModel.js';
import estateTypeModel from '../models/estateTypeModel.js';
import energyLabelModel from '../models/energyLabelModel.js';
import imageModel from '../models/imageModel.js';

export const dbController = express.Router();

// Test database connection
dbController.get('/test', async (req, res) => {	
	try {
		await sequelize.authenticate();
		console.log('Database connection successful');
		res.status(200).json({ message: 'Database connection successful' });
	} catch (error) {
		console.error('Error! Could not connect to the database:', error);
		res.status(500).json({ error: 'Could not connect to the database' });
	}
});

// Synchronize database tables
dbController.get('/sync', async (req, res) => {
	try {
		const forceSync = req.query.force === 'true';
		await sequelize.sync({ force: forceSync });

		res.send(`Database synchronized ${forceSync ? 'with force' : 'without force'}`);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Seed database from CSV files
dbController.get('/seedfromcsv', async (req, res) => {
	try {
		await seedFromCsv('user.csv', userModel);
		await seedFromCsv('estate-type.csv', estateTypeModel);
		await seedFromCsv('energy-label.csv', energyLabelModel);
		await seedFromCsv('image.csv', imageModel);
		await seedFromCsv('city.csv', cityModel);

		res.send({ message: 'Seeding completed' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});