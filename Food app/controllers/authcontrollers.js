const userModels = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER 
const registerController = async (req, res) => {

    try {
        const { userName, email, password, phone, address, answer } = req.body;

        //Validation of providing all fields
        if (!userName || !email || !password || !phone || !address) {
            return res.status(500).json({
                success: false,
                meassge: "please provide all fields"
            })
        }

        //check user 
        const existing = await userModels.findOne({ email })

        if (existing) {
            return res.status(500).json({
                success: false,
                meassge: "Email already existed"
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hash(password, salt)


        //create new user
        const user = await userModels.create({
            userName,
            email,
            password: hasedPassword,
            phone,
            address,
            answer
        })
        res.status(201).json({
            success: true,
            meassge: "succefully registered",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            meassge: "Error in register api",
            error: error.meassge
        });
    }
}


//LOGIN.
const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        //validation 
        if (!email) {
            return res.status(500).json({
                success: false,
                meassge: "please provide Email"
            })
        }

        if (!password) {
            return res.status(500).json({
                success: false,
                meassge: "please provide password"
            })
        }

        //check user
        const user = await userModels.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                meassge: "User not found"
            })
        }

        //check user password or compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(500).json({
                success: false,
                meassge: "Invalid Password"
            })
        }

        //create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "7d" })

        res.status(200).json({
            success: true,
            meassge: "Login Successfully",
            token,
            // user    //this show the user info in api testing
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            meassge: "Error in login api",
            error
        });
    }
}


module.exports = { registerController, loginController }