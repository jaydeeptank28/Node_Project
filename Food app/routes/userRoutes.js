const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middleware/authMiddlware');
const router = express.Router();

//Get user || get
router.get('/getuser', jwtAuthMiddleware, getUserController)

//Update User
router.put('/updateuser', jwtAuthMiddleware, updateUserController)

//update Password
router.post('/updatepassword', jwtAuthMiddleware, updatePasswordController)

//Reset Password
router.post('/resetpassword', jwtAuthMiddleware, resetPasswordController)

//Delete Password
router.delete('/deleteuser/:id', jwtAuthMiddleware, deleteUserController)

module.exports = router;