const userModel = require('../models/userModels');

const adminMiddleware = async (req, res, next) => {
    try {

        const user = await userModel.findById(req.body.id);

        if (user.userType !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Only admin can Access"
            })
        } else {
            next()
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Un-Authorized Access",
            error
        })
    }
}

module.exports = adminMiddleware;