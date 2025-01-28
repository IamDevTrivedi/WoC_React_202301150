// controllers/user.controller.js


// custom logger
const logger = require('../lib/logger.lib.js');

// User model
const User = require('../models/user.model.js');
const File = require('../models/file.model.js');
const { v4 } = require('uuid');
const { get } = require('request');

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
    },


    // addFile controller
    addFile: async (req, res) => {

        logger.post("/api/user/add-file");

        // get the required fields from the request body
        const { id, fileName, fileLanguage, fileContent } = req.body;

        if (!id || !fileName || !fileLanguage || !fileContent) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        try {

            const user = await User.findById(id);
            console.log('id', id);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }


            const newFile = new File({
                fileId: v4(),
                fileContent: fileContent,
                owner: id,
                fileLanguage: fileLanguage,
                fileName: fileName,
            });


            await newFile.save();

            res.status(201).json({ success: true, message: "File added successfully", data: newFile });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // getFiles controller
    getFiles: async (req, res) => {

        logger.post("/api/user/get-files");

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        try {

            const existingUser = await User.findById(id);

            if (!existingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }


            const files = await File.find({ owner: id });

            if (files.length === 0) {
                return res.status(404).json({ success: false, message: "User has no Files" });
            }

            res.status(200).json({ success: true, message: "Files fetched successfully", data: files });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

    },


    // deleteFile controller
    deleteFile: async (req, res) => {

        logger.post("/api/user/delete-file");

        const { fileId, id } = req.body;

        if (!fileId || !id) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        try {

            const existingUser = await User.findById(id);

            if (!existingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const existingFile = await File.findOne({ fileId: fileId, owner: id });

            if (!existingFile) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            await File.findOneAndDelete({ fileId: fileId, owner: id });

            res.status(200).json({ success: true, message: "File deleted successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // updateFile controller
    updateFile: async (req, res) => {

        const { fileId, id, newFileContent } = req.body;

        if (!fileId || !id || !newFileContent) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        try {

            const existingUser = await User.findById(id);

            if (!existingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const existingFile = await File.findOne({ fileId: fileId, owner: id });

            if (!existingFile) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            await File.findOneAndUpdate({ fileId: fileId, owner: id }, { fileContent: newFileContent });

            res.status(200).json({ success: true, message: "File updated successfully", data: existingFile });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },


    // renameFile controller
    renameFile: async (req, res) => {

        const { fileId, id, newFileName, fileLanguage } = req.body;


        if (!fileId || !id || !newFileName) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        try {

            const existingUser = await User.findById(id);

            if (!existingUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const existingFile = await File.findOne({ fileId: fileId, owner: id });

            if (!existingFile) {
                return res.status(404).json({ success: false, message: "File not found" });
            }

            await File.findOneAndUpdate({ fileId: fileId, owner: id }, { fileName: newFileName, fileLanguage: fileLanguage });

            res.status(200).json({ success: true, message: "File renamed successfully", data: existingFile });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = userController;