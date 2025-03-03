import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';



require('dotenv').config();
const express = require('express');
const db = require('./config/database');
const cityRoutes = require('./controller/cityController');



const dbController = require('./controller/dbController');
app.use('/db', dbController);

const app = express();
app.use(express.json());

// Routes
app.use('/cities', cityRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
