// ./routes/user.router.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post("/get-user-details", authMiddleware.protectRoute , userController.getUserDetails);

module.exports = router;