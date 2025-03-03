import express from 'express';
import { staffModel } from '../models/staffsModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const staffController = express.Router();

/**
 * READ: Fetch all cities
 */
staffController.get('/staff', async (req, res) => {
    try {
        const list = await staffModel.findAll();
        console.log(list);
        

        if (!list || list.length === 0) {
            return errorResponse(res, 'No staff found', 404);
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching staff: ${error.message}`);
    }
});

/**
 * READ: Fetch a single staff by ID
 */
staffController.get('/staff/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const details = await staffModel.findOne({ where: { id: id } });

        if (!details) return errorResponse(res, "staff not found", 404);

        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching staff: ${error.message}`);
    }
});

/**
 * CREATE: Add a new staff
 */



staffController.post('/staff', async (req, res) => {
    try {
        const result = await staffModel.create(req.body);
        res.status(201).json({ message: "staff created successfully", result });
    } catch (error) {
        res.status(500).json({ message: `Error creating staff: ${error.message}` });
    }
});

/**
 * UPDATE: Update a staff
 */
staffController.put('/staff/:id([0-9]+)', async (req, res) => {
    try {
        
        const {id} = req.params 
        const [updated] = await staffModel.update(req.body, { where: { id } });

        if (!updated) return errorResponse(res, `No staff found with ID: ${id}`, 404);

        successResponse(res,req.body, "staff updated successfully");
    } catch (error) {
        errorResponse(res, `Error updating staff: ${error.message}`);
    }
});

/**
 * DELETE: Remove a staff
 */
staffController.delete('/staff/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await staffModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No staff found with ID: ${id}`, 404);

        successResponse(res, null, "staff deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting staff: ${error.message}`);
    }
});
