const categoryModel = require('../models/categoryModel')

//Create Category
const createCategoryController = async (req, res) => {

    try {
        const { title, imageUrl } = req.body;

        //Validation
        if (!title) {
            return res.status(500).json({
                success: false,
                message: "Please Provide Category Title or Image"
            })
        };

        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category Created",
            newCategory
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Create Category Api",
            error: error.message
        })
    }
}


//get all category--------------------------------------------------------

const getAllCategoryController = async (req, res) => {

    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found"
            })
        }

        res.status(200).json({
            success: true,
            totalCategory: categories.length,
            categories
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in get category by id api",
            error: error.message
        })
    }
}

//get categories by Id

const getCategoryByIdController = async (req, res) => {

    try {
        const categories = await categoryModel.findById(req.params.id);
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found"
            })
        }

        res.status(200).json({
            success: true,
            categories
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in get all category api",
            error: error.message
        })
    }
}

//update category-----------------------------------------------------------
const updateCategoryController = async (req, res) => {

    try {

        const { id } = req.params;
        const { title, imageUrl } = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(id,
            { title, imageUrl },
            { new: true });

        if (!updateCategory) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "category Updated Succesfully",
            updateCategory
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in get all category api",
            error: error.message
        })
    }
}


// delete category 
const deleteCategoryController = async (req, res) => {

    try {

        const categoryId = req.params.id

        if (!categoryId) {
            return res.status(404).json({
                success: false,
                message: "No Category Found Or Provide Category ID"
            })
        }

        await categoryModel.findByIdAndDelete(categoryId)

        res.status(200).json({
            success: true,
            message: "Category Delete Succesfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Category api",
            error: error.message
        })
    }

}
module.exports = { createCategoryController, getAllCategoryController, getCategoryByIdController, updateCategoryController, deleteCategoryController }