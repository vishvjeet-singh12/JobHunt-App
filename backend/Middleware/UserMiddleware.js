const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const UserMiddleware = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({
                message: "Token is not provided",
            });
        }

        // Extract the token value
        const jwtToken = token.replace("Bearer ", "").trim();

        // Verify the token
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

        // Find user based on decoded token data
        const UserData = await UserModel.findOne(
            { email: isVerified.email },
            { password: 0 } // Exclude the password field
        );

        if (!UserData) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Attach user data and token to the request object
        req.user = UserData;
        req.token = token;
        req.id = UserData._id;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Middleware Error:", error.message);
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = UserMiddleware;
