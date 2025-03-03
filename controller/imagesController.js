import express from 'express';
import { Image } from '../models/imagesModel.js';

import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const imagesController = express.Router();

/**
 * READ: Hent alle billeder
 */
imagesController.get('/', async (req, res) => {
    try {
        const images = await Image.findAll();
        if (!images || images.length === 0) {
            console.log("❌ No images found in database");  // Log fejlen
            return errorResponse(res, 'No images found', 404);
        }
        successResponse(res, images);
    } catch (error) {
        console.error("❌ Error fetching images:", error);  // Log fejlen
        errorResponse(res, `Error fetching images: ${error.message}`);
    }
});


/**
 * READ: Hent et billede via ID
 */
imagesController.get('/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const image = await Image.findOne({ where: { id } });

        if (!image) return errorResponse(res, "Image not found", 404);

        successResponse(res, image);
    } catch (error) {
        errorResponse(res, `Error fetching image: ${error.message}`);
    }
});

/**
 * CREATE: Tilføj et nyt billede
 */
imagesController.post('/', async (req, res) => {
    try {
        const { filename, author, description } = req.body;
        const newImage = await Image.create({ filename, author, description });
        res.status(201).json({ message: "Image uploaded successfully", newImage });
    } catch (error) {
        res.status(500).json({ message: `Error uploading image: ${error.message}` });
    }
});

/**
 * UPDATE: Opdater et billede
 */
imagesController.put('/:id([0-9]+)', async (req, res) => {
    try {
        const { filename, author, description } = req.body;
        const { id } = req.params;

        const [updated] = await Image.update({ filename, author, description }, { where: { id } });

        if (!updated) return errorResponse(res, `No image found with ID: ${id}`, 404);

        successResponse(res, { id, filename, author, description }, "Image updated successfully");
    } catch (error) {
        errorResponse(res, `Error updating image: ${error.message}`);
    }
});

/**
 * DELETE: Slet et billede
 */
imagesController.delete('/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Image.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No image found with ID: ${id}`, 404);

        successResponse(res, null, "Image deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting image: ${error.message}`);
    }
});
