import express from 'express';
import { User } from '../models/userModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const userController = express.Router();

/**
 * READ: Fetch all users
 */
userController.get('/', async (req, res) => {
    try {
        const list = await User.findAll();
        if (!list || list.length === 0) {
            return errorResponse(res, 'No users found', 404);
        }
        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching users: ${error.message}`);
    }
});

/**
 * READ: Fetch a single user by ID
 */
userController.get('/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const details = await User.findOne({ where: { id: id } });

        if (!details) return errorResponse(res, "User not found", 404);

        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching user: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user
 */
userController.post('/', async (req, res) => {
    try {
        let { firstname, lastname, email, password, refresh_token, is_active } = req.body;
        const result = await User.create({ firstname, lastname, email, password, refresh_token, is_active });
        res.status(201).json({ message: "User created successfully", result });
    } catch (error) {
        res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
});

/**
 * UPDATE: Update a user
 */
userController.put('/:id([0-9]+)', async (req, res) => {
    try {
        const { id, firstname, lastname, email, password } = req.body;

        if (!id || !firstname || !lastname || !email || !password) 
            return errorResponse(res, "All fields are required", 400);

        const [updated] = await User.update(
            { firstname, lastname, email, password },
            { where: { id } }
        );

        if (!updated) return errorResponse(res, `No user found with ID: ${id}`, 404);

        successResponse(res, { id, firstname, lastname, email }, "User updated successfully");
    } catch (error) {
        errorResponse(res, `Error updating user: ${error.message}`);
    }
});

/**
 * DELETE: Remove a user
 */
userController.delete('/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No user found with ID: ${id}`, 404);

        successResponse(res, null, "User deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting user: ${error.message}`);
    }
});
