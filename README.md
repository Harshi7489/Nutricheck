# FoodHub - AI Nutrition Calorie Tracker

A full-stack web application for personalized meal planning and calorie tracking powered by Google Gemini AI. Users can input their personal health metrics (BMR/TDEE), generate AI-powered meal plans tailored to their fitness goals, and track daily nutrition intake with an interactive calorie calculator.

## 🚀 Features

- **BMR/TDEE Calculator** – Calculate Basal Metabolic Rate and Total Daily Energy Expenditure based on personal metrics (age, sex, height, weight, activity level)
- **AI-Powered Meal Generation** – Generate personalized 2-day meal plans based on:
  - Diet type (Vegetarian, Non-Vegetarian, Gluten-Free, Vegan)
  - Fitness goal (Weight Loss, Weight Gain, Maintenance)
  - User's BMR/TDEE and calorie targets
- **Recipe Selection & Storage** – Select recipes, persist selections across pages with automatic deduplication
- **Interactive Calorie Calculator** – Add ingredients or AI-generated meals, track macros (protein, carbs, fats) in real-time
- **Nutrition Summary** – Visual progress bars and detailed breakdowns of daily nutrition intake vs. targets
- **Persistent Storage** – All user data (profile, selections, ingredients) saved to browser localStorage
- **Responsive Design** – Works on desktop and mobile devices

## 📁 Project Structure

```
FOODHUB/
├── backend/                        # Node.js/Express backend
│   ├── server.js                   # Main server entry point
│   ├── package.json
│   ├── .env                        # Environment variables (create this)
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   ├── foodController.js
│   │   └── mealController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Meal.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── meal.js
│   │   ├── food.js
│   │   ├── ai.js
│   │   └── recipes.js
│   └── utils/
│       ├── foodData.js
│       └── RecipeManager.js
│
├── frontend/frontend/              # React/Vite frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Dashboard.jsx        # AI Meal Planner + BMR Form
│   │   │   ├── BmrForm.jsx          # BMR/TDEE input form
│   │   │   ├── MealLogger.jsx
│   │   │   ├── MealSuggestions.jsx
│   │   │   ├── FoodSearch.jsx
│   │   │   ├── AuthForm.jsx
│   │   │   ├── CalorieCalculator.jsx
│   │   │   ├── calculator/
│   │   │   │   ├── CalorieCalculator.jsx
│   │   │   │   ├── IngredientRow.jsx
│   │   │   │   ├── IngredientSearchModal.jsx
│   │   │   │   ├── NutritionSummary.jsx
│   │   │   │   └── TargetCalorieModal.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── CalculatorPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── auth.jsx
│   │   └── utils/
│   │       └── bmr.js              # BMR/TDEE calculation utilities
│   ├── public/
│   └── assets/
│
└── README.md                       # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – Database (optional for dev, server runs without it)
- **Mongoose** – MongoDB ODM
- **Google Gemini AI** – AI model for meal generation
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **CORS** – Cross-origin resource sharing
- **Dotenv** – Environment variable management

### Frontend
- **React 19** – UI library
- **Vite** – Build tool & dev server
- **React Router** – Client-side routing
- **CSS** – Styling (inline and external)
- **LocalStorage** – Browser data persistence

## 📋 Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **Google Gemini API Key** – [Get it here](https://aistudio.google.com/app/apikey)
- **MongoDB URI** (optional; server runs without DB in dev mode)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NidhiHalwe/nutrihub-nutrition-calorie-tracker.git
cd FOODHUB
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_uri_here   # Optional; server starts without it
PORT=5000
```

**To get a Gemini API key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into `.env`

Start the backend:

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node server.js`
Server running on port 5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend/frontend
npm install
npm run dev
```

The app should open at `http://localhost:5173` (or another port if 5173 is busy).

## 🎯 How to Use

### 1. Calculate Your Profile (BMR/TDEE)

1. Open the **Dashboard** page.
2. Fill in the BMR form:
   - **Age** (years)
   - **Sex** (Male/Female)
   - **Height** (cm)
   - **Weight** (kg)
   - **Activity Level** (Sedentary to Extra Active)
3. Click **"Save Profile"**.
4. Your BMR and TDEE will be calculated and displayed.

### 2. Generate AI Meal Plan

1. Select a **Diet Type** (Vegetarian, Non-Vegetarian, Gluten-Free, Vegan).
2. Select a **Goal** (Weight Loss, Weight Gain, Maintenance).
3. Click **"Generate AI Meal Plan"**.
4. Two AI-generated recipes will appear.

### 3. Select & Track Meals

1. Click the **"Add"** checkbox on recipes you want to track.
2. Click **"Open in Calculator"** to go to the Calorie Calculator.
3. Selected meals will be automatically imported as ingredients.
4. View your nutrition totals in the **Nutrition Summary** panel.

### 4. Add More Ingredients (Optional)

1. On the Calorie Calculator page, click **"Add Ingredient"**.
2. Search for and select an ingredient.
3. Adjust the quantity as needed.
4. Watch the **Nutrition Summary** update in real-time.

### 5. Set Daily Calorie Target

1. Click **"Update Target"** in the Nutrition Summary.
2. Set your desired daily calorie goal.
3. The progress bar will show your current intake vs. target.

## 📊 Key Calculations

### BMR (Basal Metabolic Rate)
Uses the **Mifflin–St Jeor Equation**:
- **For Males:** 10×weight(kg) + 6.25×height(cm) − 5×age(years) + 5
- **For Females:** 10×weight(kg) + 6.25×height(cm) − 5×age(years) − 161

### TDEE (Total Daily Energy Expenditure)
```
TDEE = BMR × Activity Factor
```

Activity factors:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Extra Active: 1.9

### Calorie Target by Goal
- **Weight Loss:** TDEE − 500 kcal (minimum 1200 kcal)
- **Weight Gain:** TDEE + 500 kcal
- **Maintenance:** TDEE

## 🔄 Data Flow

```
User Profile (BmrForm)
    ↓
BMR/TDEE Calculation
    ↓
AI Meal Generation (with calorie target)
    ↓
Recipe Selection (with macro extraction)
    ↓
localStorage: selectedRecipes
    ↓
CalorieCalculator (import + custom ingredients)
    ↓
NutritionSummary (totals + progress)
    ↓
localStorage: calculatorIngredients
```

## 💾 LocalStorage Schema

**`foodhub_profile`**
```json
{
  "age": 25,
  "sex": "male",
  "heightCm": 180,
  "weightKg": 75,
  "activityLevel": "moderately_active",
  "bmr": 1750,
  "tdee": 2712
}
```

**`selectedRecipes`**
```json
[
  {
    "id": "recipe-name-slug",
    "name": "Recipe Name",
    "calories": 950,
    "protein": 45.5,
    "carbs": 120.0,
    "fats": 35.0
  }
]
```

**`calculatorIngredients`**
```json
[
  {
    "name": "Ingredient Name",
    "sourceId": "ingredient-slug",
    "uniqueId": 1234567890.123,
    "quantity": 100,
    "servingSize": 100,
    "unit": "g",
    "calories": 250,
    "calculatedCalories": 250,
    "protein": 10,
    "calculatedProtein": 10,
    "carbs": 30,
    "calculatedCarbs": 30,
    "fats": 5,
    "calculatedFats": 5
  }
]
```

**`targetCalories`**
```json
2200
```

## 🐛 Troubleshooting

### Backend won't start: "Connection Refused"
- Ensure the backend process is running: `npm run dev` in the `backend` folder.
- Check that port 5000 is not in use: `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows).

### "GEMINI_API_KEY not set" error
- Create `.env` file in `backend` folder.
- Add your API key: `GEMINI_API_KEY=your_key_here`.
- Restart the backend.

### Frontend shows blank page or 404
- Ensure frontend is running on `http://localhost:5173`.
- Clear browser cache and refresh.
- Check browser console for errors.

### Meals not importing to Calculator
- Open DevTools Console and check:
  ```js
  localStorage.getItem('selectedRecipes')
  localStorage.getItem('calculatorIngredients')
  ```
- If storage is corrupt, clear it: `localStorage.clear()`.

### Duplicate ingredients in Calculator
- The app uses `sourceId` (slugified recipe name) to prevent duplicates.
- If duplicates persist, clear storage: `localStorage.removeItem('calculatorIngredients')`.

## 📡 API Endpoints

### POST `/generate-meal`
Generate AI meal plan.

**Request:**
```json
{
  "input": "Generate a 2-day meal plan for Vegetarian diet with a focus on Weight Loss. User profile: age 25, sex male, height 180 cm, weight 75 kg. Estimated BMR 1750 kcal/day and TDEE 2712 kcal/day. Please tailor the recipes so daily calories are around 2212 kcal for the specified goal."
}
```

**Response:**
```json
{
  "mealPlan": "{\"recipes\": [{\"Recipe Name\": \"...\", \"Dish Type\": \"...\", ...}]}"
}
```

## 🔐 Authentication Routes

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – User login
- `POST /api/auth/logout` – User logout

## 🎨 Customization

### Change Primary Color
Edit `src/App.css` or override inline styles in components. The app uses `var(--color-primary)` which defaults to a blue tone.

### Adjust BMR Formula
Edit `src/utils/bmr.js` – `calculateBMR()` function.

### Modify AI Prompt
Edit `src/components/Dashboard.jsx` – `handleGenerateMeal()` function where the `input` string is built.

### Add Ingredients Database
Modify `IngredientSearchModal.jsx` to fetch from an API instead of local data.

## 📝 Future Enhancements

- [ ] User authentication and cloud data sync
- [ ] Meal history and weekly tracking
- [ ] Barcode scanner for quick ingredient lookup
- [ ] Export meal plans as PDF
- [ ] Grocery list generator
- [ ] Recipe favorites & custom recipes
- [ ] Mobile app (React Native)
- [ ] Integration with fitness trackers (Fitbit, Apple Health)
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License.

## 👤 Author

**Nidhi Halwe**
- GitHub: [@NidhiHalwe](https://github.com/NidhiHalwe)
- Repository: [nutrihub-nutrition-calorie-tracker](https://github.com/NidhiHalwe/nutrihub-nutrition-calorie-tracker)

## 📧 Support

For issues, questions, or feedback, open an issue on GitHub or contact the project maintainer.

---

**Happy Tracking! 🥗💪**
