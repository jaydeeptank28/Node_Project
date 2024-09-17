const express = require('express');
const { jwtAuthMiddleware } = require('../middleware/authMiddlware');
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

//CREATE FOOD
router.post("/create", jwtAuthMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getallfood", getAllFoodsController);

// GET SINGLE FOOD
router.get("/getsinglefood/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getbyresturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/updatefood/:id", jwtAuthMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/deletefood/:id", jwtAuthMiddleware, deleteFoodController);

//Place Order
router.post('/placeorder', jwtAuthMiddleware, placeOrderController)

//Order Status 
router.post('/orderstatus/:id', jwtAuthMiddleware, adminMiddleware, orderStatusController)

module.exports = router;