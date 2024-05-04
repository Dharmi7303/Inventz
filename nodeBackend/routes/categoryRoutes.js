const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

// Create a category
router.post('/', async (req, res) => {
    try {
        const category = req.body;
        const createdCategory = await categoryService.createCategory(category);
        res.status(200).json(createdCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all categories with pagination and search
router.get('/', async (req, res) => {
    try {
        const { searchCriteria, page, pageSize } = req.query;
        // console.log(searchCriteria, page, pageSize)
        const categories = await categoryService.getAllCategories(searchCriteria, parseInt(page), parseInt(pageSize));
        console.log(categories)
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(parseInt(id));
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const categoryData = req.body;
        const updatedCategory = await categoryService.updateCategory(parseInt(id), categoryData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
