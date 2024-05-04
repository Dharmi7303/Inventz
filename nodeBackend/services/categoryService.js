const Category = require('../models/Category');

// Create a category
async function createCategory(categoryData) {
    try {
        const createdCategory = await Category.create(categoryData);
        return createdCategory;
    } catch (error) {
        throw new Error('Failed to create category');
    }
}

// Get all categories with pagination and search
async function getAllCategories(searchCriteria, page, pageSize) {
    try {
        // Implement pagination and search logic here
        // console.log("getalll");
        const categories = await Category.findAll(  {attributes: ['category_id', 'name', 'created_at']});
        // console.log(categories);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
}

// Get a category by ID
async function getCategoryById(id) {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error('Failed to fetch category');
    }
}

// Update a category
async function updateCategory(id, categoryData) {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        await category.update(categoryData);
        return category;
    } catch (error) {
        throw new Error('Failed to update category');
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
};
