# 🌾 PlantScan - AI-Powered Agricultural Assistant

A smart, farmer-first platform that leverages AI for **plant disease detection**, **government scheme recommendations**, and **mandi price optimization**, empowering farmers to make data-driven decisions.
Demo-Video of Setup-https://drive.google.com/file/d/1azFaCLcyD21dVNXEoDwOuoaJ45GE45_V/view?usp=sharing
Demo-Video of Working-https://drive.google.com/file/d/14hEQFI75eVP4dKt68AtnQMLFpxTGms8M/view?usp=sharing
## 🎯 Problem Statement

Farmers face challenges in identifying crop diseases early, accessing relevant government schemes, and maximizing crop profits due to fragmented information and lack of technical tools.

**PlantScan bridges this gap** by providing a unified AI-powered platform with image analysis, localized scheme suggestions, and mandi market analysis.

## 🚀 Features

- 📸 **Plant Disease Detection**: Upload images to instantly identify crop diseases and receive treatment suggestions  
- 🏛️ **Scheme Recommendation**: Get relevant government schemes tailored to your state, district, and needs  
- 📊 **Mandi Price Advisor**: Discover the best locations to sell crops with smart price comparison  
- 🔐 **User Authentication**: Secure and streamlined login/registration system  
- 💻 **Modern UI**: Sleek, responsive interface built with React and Tailwind  

## 🏗️ Architecture

This project follows a microservices architecture with three main components:

- **Frontend**: React.js application with Vite  
- **Backend**: Node.js/Express.js API server  
- **LLM Service**: Python FastAPI service for AI-powered features  

## 📁 Project Structure

```
Mock_Hack2/
├── Frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── data/            # Static data files
│   │   └── App.jsx          # Main application component
│   ├── package.json
│   └── vite.config.js
├── Backend/                  # Node.js backend API
│   ├── controllers/         # API controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   └── index.js            # Server entry point
└── llm/                    # Python AI service
    ├── app.py              # FastAPI application
    ├── utils.py            # AI utility functions
    ├── schemes.py          # Government schemes data
    └── consts.py           # Constants and configurations
```

## 🛠️ Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (running locally or cloud instance)
- **Git**

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Mock_Hack2
```

### 2. Environment Variables Setup

Create `.env` files in the following directories:

#### Backend/.env
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### llm/.env
```env
GROQ_API_KEY=your_groq_api_key
GEMINI_API=your_gemini_api_key
GOV_API=your_government_api_key
```

### 3. Backend Setup

```bash
cd Backend
npm install
nodemon index.js
```

The backend server will run on `http://localhost:3000`

### 4. LLM Service Setup

```bash
cd llm
pip install -r requirements.txt
uvicorn app:app --reload
```

The LLM service will run on `http://localhost:8000`

### 5. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend application will run on `http://localhost:5173`

## 🔑 API Keys Required

To use all features, you'll need the following API keys:

1. **Groq API Key**: For LLM-powered responses
   

2. **Google Gemini API Key**: For image analysis
 
3. **Government Data API Key**: For mandi price data
   - Visit [data.gov.in](https://data.gov.in/)
   - Register and get your API key

## 🚀 Running the Application

1. **Start MongoDB** 
2. **Start the Backend**: `cd Backend && nodemon index.js`
3. **Start the LLM Service**: `cd llm fastapi dev app.py`
4. **Start the Frontend**: `cd Frontend && npm run dev`

Open your browser and navigate to `http://localhost:5173`

## 📱 Available Routes

### Frontend Routes
- `/` - Authentication page
- `/home` - Main dashboard
- `/schemes` - Government schemes finder
- `/scan` - Plant disease detection
- `/marketplace` - Mandi price analysis

### Backend API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `POST /api/prompt/*` - Various prompt-based endpoints

### LLM Service Endpoints
- `POST /mandi_price` - Get mandi price recommendations
- `POST /image_query` - Analyze plant images for diseases
- `POST /govt_scheme` - Find relevant government schemes

---
