const express = require('express');
const { jwtAuthMiddleware } = require('../middleware/authMiddlware');
const { createResturantController, getResturantController, getResturantByIdContoller, deleteResturantController } = require('../controllers/resturantController');
const router = express.Router();

//Create Resturant || Post
router.post('/create', jwtAuthMiddleware, createResturantController);

//get all Resturant || Get
router.get('/getallresturant', getResturantController)

//get resturant bt id  || get
router.get('/getresturant/:id', getResturantByIdContoller)

//Delete Resturant || Delete
router.delete('/deleteresturant/:id', jwtAuthMiddleware, deleteResturantController)

module.exports = router;