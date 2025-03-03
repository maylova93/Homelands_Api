import express from 'express';
import dotenv from 'dotenv';
import { dbController } from './controller/dbController.js';
import { cityController } from './controller/cityController.js';
import { staffController } from './controller/staffController.js';
import { userController } from './controller/userController.js';
import { imagesController } from './controller/imagesController.js';
import { estateTypesController } from './controller/estateTypesController.js';



dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
app.use(express.urlencoded({ extended: true }))

// Middleware
app.use(express.json());

app.use(dbController)
app.use(cityController)
app.use(staffController)
app.use('/images', imagesController)
app.use('/users', userController)
app.use('/estate_types', estateTypesController);


// Test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
