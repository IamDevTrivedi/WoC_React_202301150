// controllers/user.controller.js


// custom logger
const logger = require('../lib/logger.lib.js');

// User model
const User = require('../models/user.model.js');

// User controller
const userController = {


    // getUserDetails controller
    getUserDetails: async (req, res) => {

        // log the request
        logger.post("/api/user/get-user-details");

        const { id } = req.body;

        try {
            
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, message: "User details fetched successfully", data: user });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = userController;