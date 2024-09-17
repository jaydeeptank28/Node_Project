const express = require('express');
const { jwtAuthMiddleware } = require('../middleware/authMiddlware');
const { createCategoryController, getAllCategoryController, getCategoryByIdController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();

//Create New Category || post
router.post('/createcategory', jwtAuthMiddleware, createCategoryController);

//Get all Category || Get
router.get('/getallcategory', jwtAuthMiddleware, getAllCategoryController)

//Get Category by Id || Get
router.get('/getcategorybyid/:id', jwtAuthMiddleware, getCategoryByIdController)

//Update Category || put
router.put('/updatecategory/:id', jwtAuthMiddleware, updateCategoryController)

//delete Category || Delete
router.delete('/deletecategory/:id', jwtAuthMiddleware, deleteCategoryController)


module.exports = router;