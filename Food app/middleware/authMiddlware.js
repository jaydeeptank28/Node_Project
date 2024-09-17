const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = async (req, res, next) => {
    try {

        //get token
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    meassge: "Unauthorize user"
                })
            } else {
                req.body.id = decode.id
                next();
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            meassge: "Provide Token",
            error
        });
    }
}

module.exports = { jwtAuthMiddleware }