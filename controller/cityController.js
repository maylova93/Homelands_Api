import express from 'express';
import { City } from '../models/cityModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const cityController = express.Router();

/**
 * READ: Fetch all cities
 */
cityController.get('/', async (req, res) => {
    try {
        const list = await City.findAll();
        console.log(list);
        

        if (!list || list.length === 0) {
            return errorResponse(res, 'No cities found', 404);
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching cities: ${error.message}`);
    }
});

/**
 * READ: Fetch a single city by ID
 */
cityController.get('/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const details = await City.findOne({ where: { id: id } });

        if (!details) return errorResponse(res, "City not found", 404);

        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching city: ${error.message}`);
    }
});

/**
 * CREATE: Add a new city
 */



cityController.post('/', async (req, res) => {
    try {
        let { name, population } = req.body;
        const result = await City.create({ name, population });
        res.status(201).json({ message: "City created successfully", result });
    } catch (error) {
        res.status(500).json({ message: `Error creating city: ${error.message}` });
    }
});

/**
 * UPDATE: Update a city
 */
cityController.put('/cities/:id([0-9]+)', async (req, res) => {
    try {
        
        const { id, name, zipcode, city_id,  population } = req.body;

        if (!id || !zipcode|| !city_id || !name || !population) return errorResponse(res, "All fields are required", 400);

        const [updated] = await City.update({ name, population }, { where: { id } });

        if (!updated) return errorResponse(res, `No city found with ID: ${id}`, 404);

        successResponse(res, { id, name, zipcode, city_id, population }, "City updated successfully");
    } catch (error) {
        errorResponse(res, `Error updating city: ${error.message}`);
    }
});

/**
 * DELETE: Remove a city
 */
cityController.delete('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await City.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No city found with ID: ${id}`, 404);

        successResponse(res, null, "City deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting city: ${error.message}`);
    }
});
