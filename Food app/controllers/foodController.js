const foodModel = require('../models/foodModel');
const Oreder = require('../models/orederModel');
const orderModel = require('../models/orederModel')

// create Food------------------------------------------------------------------------
const createFoodController = async (req, res) => {
    try {
        const { foodData } = req.body;

        if (!foodData.title || !foodData.description || !foodData.price || !foodData.resturnat) {
            return res.status(500).json({
                success: false,
                message: "Please Provide all fields",
            });
        }

        const newFood = new foodModel(foodData);

        await newFood.save();
        res.status(201).json({
            success: true,
            message: "New Food Item Created",
            newFood
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in create food api",
            error: error.message
        });
    }
}

// get all Food-------------------------------------------------------------------
const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find();

        if (!foods) {
            return res.status(404).json({
                success: false,
                message: "no food items was found"
            })
        }
        res.status(200).json({
            success: true,
            totalFoods: foods.length,
            foods
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in get all food api",
            error: error.message
        });
    }
}
// get single Food--------------------------------------------------------------
const getSingleFoodController = async (req, res) => {
    try {

        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "no food items was found"
            })
        }

        res.status(200).json({
            success: true,
            message: "single Food get succesfully",
            food
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in get single food api",
            error: error.message
        });
    }
}

// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).json({
                success: false,
                message: "please provide id",
            });
        }
        const food = await foodModel.find({ resturnat: resturantId });
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "No Food Found with this id",
            });
        }
        res.status(200).json({
            success: true,
            message: "food base on resturant",
            totalFood: food.length,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error In get Food by resturant API",
            error,
        });
    }
};


// update Food
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(404).json({
                success: false,
                message: "No food ID was found",
            });
        }

        const { foodData } = req.body;

        // Directly updating the food item and returning the updated data
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { ...foodData },  // Spread the foodData to update the document
            { new: true }      // Return the updated document
        );

        if (!updatedFood) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            updatedFood,  // Return the updated food item
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in updating food item",
            error: error.message,
        });
    }
};



// delete Food
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({
                success: false,
                message: "provide food id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "No Food Found with id",
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({
            success: true,
            message: "Food Item Deleted ",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in delete food api",
            error: error.message
        });
    }
}


//Place Oreder-------------------------------------------------------------------------------------------

const placeOrderController = async (req, res) => {

    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Please add Food Cart or Payment Method",
            });
        }

        let total = 0;
        //calculation
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order Placed successfully",
            newOrder
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in delete food api",
            error: error.message
        });
    }

}


//Order status-----------------------------------------------------------------------------------------------

const orderStatusController = async (req, res) => {

    try {

        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).json({
                success: false,
                message: "Please Provide ID"
            })
        }

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json({
            success: true,
            message: "Order Status Updated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in order status api",
            error: error.message
        });
    }


}

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};