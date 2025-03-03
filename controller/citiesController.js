import express from 'express';
import cityModel from '../models/cityModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const cityController = express.Router();

/**
 * READ: Fetch all cities from the database
 */
cityController.get('/cities', async (req, res) => {
    try {
        const list = await cityModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No cities found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching cities: ${error.message}`);
    }
});

/**
 * READ: Fetch a single city by ID
 */
cityController.get('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await cityModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "City not found", 404);

        successResponse(res, city);
    } catch (error) {
        errorResponse(res, `Error fetching city: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
cityController.post('/cities', async (req, res) => {
    try {
        let { zipcode, name } = req.body;
        const result = await cityModel.create({ zipcode, name });
        successResponse(res, result, "City created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating city:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
cityController.put('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { zipcode, name } = req.body;

        // Validate that all required fields are provided
        if (!zipcode || !name) return errorResponse(res, "All fields are required", 400);

        const [updated] = await cityModel.update({ zipcode, name }, { where: { id } });

        if (!updated) return errorResponse(res, `No city found with ID: ${id}`, 404);

        successResponse(res, { id, zipcode, name }, "City updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating city: ${error.message}`);
    }
});

/**
 * DELETE: Remove a city by ID
 */
cityController.delete('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await cityModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No city found with ID: ${id}`, 404);

        successResponse(res, null, "City deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting city: ${error.message}`);
    }
});