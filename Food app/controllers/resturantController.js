const resturantModel = require('../models/resturantModel');

//Create Resturant
const createResturantController = async (req, res) => {
    try {
        // Log the request body to check the incoming data
        // console.log(req.body);

        const { resturantData } = req.body;

        // Validation
        if (!resturantData.title || !resturantData.coords) {
            return res.status(400).json({
                success: false,
                message: "Please provide both title and address"
            });
        }

        const newResturant = new resturantModel(resturantData);
        await newResturant.save();

        res.status(201).json({
            success: true,
            message: "New Restaurant Created Successfully",
            newResturant
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating restaurant",
            error: error.message
        });
    }
};


const getResturantController = async (req, res) => {

    try {
        const restaurants = await resturantModel.find({})
        if (!restaurants) {
            return res.status(404).json({
                success: false,
                message: "No Resturant Found"
            })
        }
        res.status(200).json({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Get resturant Api",
            error: error.message
        })
    }
}

const getResturantByIdContoller = async (req, res) => {

    try {

        const restaurant = await resturantModel.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Resturant Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Resturant succefully Found",
            restaurant
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in get Resturant By id Api",
            error: error.message
        })
    }
}

const deleteResturantController = async (req, res) => {

    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(404).json({
                success:false,
                message:"No Resturant Found Or Provide Resturant ID"
            })
        }

        await resturantModel.findByIdAndDelete(restaurantId);
        res.status(200).json({
            success:true,
            message:"Resturant Delete Succesfully"
        })
 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Delete Resturant Controller Api",
            error: error.message
        })
    }
}


module.exports = { createResturantController, getResturantController, getResturantByIdContoller, deleteResturantController }