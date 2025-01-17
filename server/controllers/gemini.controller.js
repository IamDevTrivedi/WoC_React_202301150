const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const logger = require('../lib/logger.lib');
const Code = require('../models/code.model');

const geminiController = {
    getRegularResponse: async (req, res) => {

        logger.post("/api/gemini/ask-regular");

        try {
            const { question } = req.body;
            const chat = await initializeExpertChat();
            const result = await chat.sendMessage(question);
            const response = result.response.text();

            return res.status(200).json({
                success: true,
                message: 'Response generated successfully',
                response
            });
            
        } catch (error) {
            logger.error("Regular response error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to generate response',
                error: error.message
            });
        }
    },

    getFileResponse: async (req, res) => {

        logger.post("/api/gemini/ask-file");

        const { codeId, question } = req.body;

        try {
            const existingCode = await Code.findOne({ codeId });
            if (!existingCode) {
                return res.status(404).json({
                    success: false,
                    message: 'Code not found'
                });
            }

            const { code } = existingCode;
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello" }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Hello! I'm your expert programming assistant. How can I help you today?" }],
                    },
                    {
                        role: "user",
                        parts: [{
                            text: `I need you to act as a senior software architect with expertise in:
                            - Algorithm optimization and complexity analysis
                            - Design patterns and best practices
                            - Code refactoring and clean code principles
                            - Performance optimization
                            - Security best practices
                            - Testing and debugging strategies
                            Please analyze code and questions with this expertise.`
                        }],
                    },
                    {
                        role: "model",
                        parts: [{
                            text: `I understand my role as a senior software architect. I'll analyze your code with focus on:
                            1. Algorithmic efficiency and time/ space complexity
                            2. Code structure and design pattern implementation
                            3. Potential optimizations and performance improvements
                            4. Security vulnerabilities and best practices
                            5. Testing strategies and edge cases
                            6. Maintainability and readability improvements
                            Please share your code or questions.`
                        }],
                    },
                    {
                        role: "user",
                        parts: [{
                            text: `Please analyze this code with your expertise:\n\n${code}`
                        }]
                    },
                    {
                        role: "model",
                        parts: [{
                            text: `I've analyzed the code. I can provide insights on:
                            - Algorithmic complexity and efficiency
                            - Potential optimizations
                            - Design improvements
                            - Security considerations
                            - Testing approaches
                            What specific aspects would you like me to focus on ?`
                        }],
                    }
                ],
            });

            const result = await chat.sendMessage(question);
            const response = result.response.text();

            return res.status(200).json({
                success: true,
                message: 'Analysis completed successfully',
                response
            });

        } catch (error) {
            logger.error("File response error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to analyze code',
                error: error.message
            });
        }
    }
};


async function initializeExpertChat() {
    return model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
            {
                role: "model",
                parts: [{ text: "Hello! I'm your expert programming assistant. How can I help you today?" }],
            },
            {
                role: "user",
                parts: [{ text: "I need an expert in software development who can provide detailed technical guidance." }],
            },
            {
                role: "model",
                parts: [{
                    text: `I'll assist you with expert-level software development guidance, focusing on:
                                - Technical best practices and patterns
                                - Code optimization and efficiency
                                - Architecture decisions
                                - Implementation strategies
                          What would you like to discuss ?`
                }],
            }
        ]
    });
}

module.exports = geminiController;