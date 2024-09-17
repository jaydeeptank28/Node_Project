const userModels = require('../models/userModels')
const bcrypt = require('bcryptjs');

//get user info------------------------------------------------------------------------------------------------------
const getUserController = async (req, res) => {

    try {
        //find user
        const user = await userModels.findById(req.body.id)
        //validation
        if (!user) {
            res.status(404).json({
                success: false,
                meassge: 'User Not Found'
            })
        }

        //Hide Password
        user.password = undefined;
        //response
        res.status(200).json({
            success: true,
            meassge: 'User Get Successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            meassge: "Error in Get User api",
            error: error.meassge
        })
    }
}


//Update User------------------------------------------------------------------------------------------------------
const updateUserController = async (req, res) => {
    try {
        // find user by ID
        const user = await userModels.findById({ _id: req.body.id });

        // validation: check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update user details if provided
        const { userName, address, phone } = req.body;

        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save()

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in update user API",
            error: error.message,
        });
    }
};


//Update Password-----------------------------------------------------------------------------------------------
const updatePasswordController = async (req, res) => {

    try {
        // find user by ID
        const user = await userModels.findById({ _id: req.body.id });

        // validation: check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //getdata from user
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(500).json({
                success: false,
                meassage: "Please Provide Old password or new password"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                meassage: "Invalid Old Password"
            })
        }

        //hashing Password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;

        await user.save()
        res.status(200).json({
            success: true,
            meassage: "password updated",
            user
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in update password API",
            error: error.message,
        });
    }
}

//Reset Password----------------------------------------------------------------------------------------------------
const resetPasswordController = async (req, res) => {

    try {

        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).json({
                success: false,
                meassage: "Please provide all fields"
            })
        }

        //find user by ID
        const user = await userModels.findOne({ email, answer });

        if (!user) {
            return res.status(404).json({
                success: false,
                meassage: "User Not Found or invalid answer"
            })
        }

        //hashed Password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        await user.save();
        res.status(200).json({
            success: true,
            meassage: "Password reset successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            meassage: "Error in Reset password api",
            error: error.meassage
        })
    }
}


//Delete User------------------------------------------------------------------------------------------------------

const deleteUserController = async (req, res) => {

    try {
        const user = await userModels.findByIdAndDelete(req.body.id);
        
        // validation: check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            meassage: "Your Account has been deleted"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            meassage: "Error in Delete Profile Api",
            error: error.meassage
        })
    }
}



module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController }