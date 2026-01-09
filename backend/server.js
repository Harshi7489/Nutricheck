import express from 'express';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Assuming these imports are necessary for your other routes:
import authRoutes from './routes/auth.js'; 
import mealRoutes from './routes/meal.js';
import foodRoutes from './routes/food.js';
import aiRoutes from './routes/ai.js';
import recipesRoutes from './routes/recipes.js';

dotenv.config();

// Gemini AI client will be created lazily and only when a valid API key is provided.
const GEMINI_MODEL = "gemini-2.5-flash"; // Fast and capable model

function getAiClient() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'REPLACE_WITH_YOUR_GEMINI_API_KEY') return null;
    return new GoogleGenAI({ apiKey: key });
}

const app = express();
app.use(cors()); // Enable CORS for the React frontend
app.use(express.json()); // To parse JSON bodies

// --- Existing Routes (Assuming you want to keep these active) ---
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recipes', recipesRoutes);
// -----------------------------------------------------------------

// ⚡ NEW AI MEAL PLANNER ROUTE (STRICT JSON OUTPUT) ⚡
app.post('/generate-meal', async (req, res) => {
    console.log('DEBUG: /generate-meal route called');
    try {
        console.log('DEBUG: Inside try block');
        // Input is the combined string from the React dropdowns (e.g., "Generate a 2-day meal plan for Vegan diet with a focus on Weight Loss.")
        const { input } = req.body; 
        console.log('DEBUG: Extracted input:', input?.substring(0, 50));

        if (!input) {
            console.log('DEBUG: No input provided');
            return res.status(400).json({ error: "Input is required for the meal planner." });
        }

        const prompt = `
            Based on the user's request: "${input}", generate two detailed, distinct recipe objects.
            
            The output MUST be a single JSON object. 
            This object MUST contain one key: 'recipes'. 
            The value of 'recipes' must be an array of exactly two JSON objects (one recipe for each day).

            Each recipe JSON object MUST use the following EXACT keys for the response:
            "Recipe Name"
            "Dish Type" (e.g., Main, Snack, Dessert)
            "Preparation Time" (e.g., 15 minutes)
            "Difficulty" (e.g., Easy, Medium, Hard)
            "Ingredients" (List all ingredients and quantities clearly in a single string)
            "Step-by-step Instructions" (List instructions clearly, numbered 1. 2. 3. etc., in a single string)
            "Chef's Tip"
            "TOTAL CALORIES" (Estimate in kcal, e.g., 450 kcal)
        `;

        // Ensure API key present and client available
        const aiClient = getAiClient();
        console.log('DEBUG: AI Client initialized:', !!aiClient);
        if (!aiClient) {
            console.error('Gemini API key not configured.');
            return res.status(500).json({ error: 'Server misconfiguration: GEMINI_API_KEY not set.' });
        }

        console.log("🔄 Generating meal plan with prompt:", input.substring(0, 100) + "...");

        const response = await aiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            // Force the model to output a valid JSON string
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        console.log("✅ Gemini response received");
        console.log('DEBUG: response.text exists:', !!response.text);
        // Send the raw JSON string text back to the frontend
        res.json({ mealPlan: response.text });
        console.log('DEBUG: Response sent successfully');
    } catch (error) {
        // Log error without revealing sensitive keys
        console.error("❌ Gemini API Error:", error?.message || error);
        console.error("Stack:", error?.stack);
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Failed to generate structured meal plan.",
                details: error?.message || "Unknown error"
            });
        }
    }
});

// --- MongoDB Connection and Server Start ---
const PORT = process.env.PORT || 5000;

function startServer() {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// If a Mongo URI is provided, try to connect but start server even if connection fails.
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        startServer();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.warn('Starting server without MongoDB connection. Some features may be disabled.');
        startServer();
    });
} else {
    console.warn('MONGO_URI not set — starting server without MongoDB.');
    startServer();
}
