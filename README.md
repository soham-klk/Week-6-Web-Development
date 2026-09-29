# 🚀 CareerPilot - Full-Stack Authentication & Career Telemetry Platform

CareerPilot is an ATS resume analysis platform built with a complete, secure User Authentication System using **Node.js, Express, MongoDB (Mongoose), JWT, and React (TypeScript)**.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework & Language:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons & Animations:** Material Symbols Outlined, Lucide React, Motion

### **Backend**
- **Runtime & Framework:** Node.js + Express.js (TypeScript with `tsx`)
- **Database:** MongoDB with Mongoose ODM
- **Authentication & Security:** 
  - `bcryptjs` for salt hashing passwords (10 rounds)
  - `jsonwebtoken` (JWT) for stateless user authentication
  - `dotenv` for environment variable configuration

---

## 📁 Project Folder Structure

```text
Week6/
├── .env                  # Private environment variables (DB URI, JWT Secret) [GitIgnored]
├── .env.example          # Template file for environment setup
├── .gitignore            # Ignores node_modules, dist, and .env
├── package.json          # Dependencies & scripts
├── server.ts             # Express server + MongoDB connection + Auth & AI API routes
├── tsconfig.json         # TypeScript compiler configuration
├── vite.config.ts        # Vite build tool configuration
├── public/               # Static web assets
└── src/
    ├── App.tsx           # Main App component with AuthProvider & tab router
    ├── index.css         # Global Tailwind CSS design tokens & dark mode styling
    ├── main.tsx          # React application entry point
    ├── components/       # Reusable UI components
    │   ├── Navbar.tsx        # Top navigation with responsive Auth state & buttons
    │   ├── Footer.tsx        # Global footer
    │   ├── AskCareerAI.tsx   # Floating AI career advisor widget
    │   └── CareerPilotLogo.tsx
    ├── context/
    │   └── AuthContext.tsx   # React Context managing User state, login, signup, logout
    ├── models/
    │   └── User.ts           # Mongoose Schema & Model for User database collection
    ├── middleware/
    │   └── auth.ts           # JWT authentication middleware for protecting server endpoints
    ├── screens/          # Page components
    │   ├── HomeScreen.tsx           # Hero section & features overview
    │   ├── ResumeScoreScreen.tsx    # ATS resume scoring engine
    │   ├── ResumeBuilderScreen.tsx  # Google XYZ bullet resume builder
    │   ├── HowItWorksScreen.tsx     # Platform explanation
    │   ├── CoursesScreen.tsx        # Recommended upskilling courses
    │   ├── FAQScreen.tsx            # Frequently asked questions
    │   ├── LoginScreen.tsx          # User Login page with validation
    │   ├── SignupScreen.tsx         # Account registration page
    │   ├── DashboardScreen.tsx      # Protected User Telemetry Dashboard
    │   └── ForgotPasswordScreen.tsx # Forgot Password & Reset flow (Bonus)
    ├── services/
    │   ├── aiService.ts     # Client AI scoring API calls
    │   └── authService.ts   # Client Auth API calls (signup, login, dashboard, logout)
    └── types/
        └── index.ts         # TypeScript interface definitions for User, Auth, Stats
```

---

## ⚡ Setup & Installation Steps

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or a MongoDB Atlas connection string).

### **1. Install Dependencies**
Open your terminal in the project directory and run:
```bash
npm install --legacy-peer-deps
```

### **2. Configure Environment Variables (`.env`)**
Create a `.env` file in the root directory (or use the provided `.env`):
```env
# Server Port
PORT=3000

# MongoDB Connection URI
MONGODB_URI=mongodb://127.0.0.1:27017/careerpilot

# JSON Web Token (JWT) Secret Key
JWT_SECRET=super_secret_careerpilot_jwt_key_2026

# Optional: Google Gemini API Key for live AI resume scoring
GEMINI_API_KEY=your_gemini_api_key_here
```

### **3. Start Local MongoDB Database**
Make sure your MongoDB server service is running. If using local MongoDB:
```bash
# Windows MongoDB service start (or run mongod)
net start MongoDB
```

### **4. Start the Application**
Run the development server:
```bash
npm run dev
```
Open your browser at: `http://localhost:3000`

---

## 🔐 How Authentication Works (Step-by-Step Flow)

Here is a simple explanation of the complete authentication pipeline:

```text
[ User Signup ]  ──►  [ Hash Password ]  ──►  [ Save to MongoDB ]  ──►  [ Issue JWT Token ]
                                                                             │
[ Client Request ] ◄──  [ Verify JWT Token ]  ◄── [ Auth Middleware ]  ◄─────┘
```

1. **User Signup (`POST /api/signup`)**:
   - The user inputs their Name, Email, and Password on the frontend Signup page.
   - The frontend validates non-empty fields, email regex format (`/^\S+@\S+\.\S+$/`), and minimum password length (>= 6 chars).
   - The server performs server-side validation and checks if the email already exists in MongoDB (`User.findOne({ email })`).

2. **Password Hashing (bcrypt)**:
   - Passwords are **never stored in plain text**.
   - The server hashes the password using `bcrypt.hash(password, 10)` before storing the user object in MongoDB.

3. **User Login (`POST /api/login`)**:
   - The user enters their Email and Password.
   - The server looks up the user by email in MongoDB.
   - The server compares the provided password with the stored hash using `bcrypt.compare(password, user.hashedPassword)`.
   - If invalid, the server returns HTTP `401 Unauthorized` with a clear error message.

4. **JWT Token Generation & Storage**:
   - Upon successful verification, the server generates a signed JSON Web Token (JWT) using `jwt.sign({ userId, name, email }, JWT_SECRET, { expiresIn: '7d' })`.
   - The client receives the JWT token and saves it securely in browser `localStorage`.

5. **Protected Route Access (`GET /api/dashboard`)**:
   - When accessing the protected Dashboard screen, the frontend attaches the JWT token to HTTP headers: `Authorization: Bearer <token>`.
   - Server-side middleware `authenticateToken` intercepts the request, verifies the token signature via `jwt.verify()`, and attaches `req.user`.
   - Unauthenticated requests receive an HTTP `401` status code and are automatically redirected to the Login page.

6. **Logout**:
   - Clicking **Logout** removes the JWT token from `localStorage` and resets client user state.

7. **Bonus: Forgot Password Flow (`POST /api/forgot-password` & `POST /api/reset-password`)**:
   - User inputs their email to generate a 6-digit reset code saved with an expiration timestamp in MongoDB.
   - User submits the 6-digit code and new password to safely update their hashed password in MongoDB.

---

## 🧪 Testing API Endpoints

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/signup` | `POST` | Public | Registers user, hashes password, returns JWT token |
| `/api/login` | `POST` | Public | Authenticates credentials, returns JWT token |
| `/api/dashboard` | `GET` | **Protected** | Requires `Authorization: Bearer <token>`, returns user profile & stats |
| `/api/logout` | `POST` | Public | Clears session token |
| `/api/forgot-password` | `POST` | Public | Generates password reset code |
| `/api/reset-password` | `POST` | Public | Updates password using reset code |
