# 🏬 SuperMall – MERN Stack Project

SuperMall is a full-stack MERN application that allows sellers to create shops, manage products, and sell them to customers.
It includes user authentication with JWT, shop management, and product CRUD operations, with both frontend (React) and backend (Node/Express/MongoDB) integration.

## 🚀 Features

### 🔐 Authentication

- User signup and login with JWT authentication
- Secure routes protected by middleware
- Persistent login via localStorage in frontend

### 🏪 Shop Management

- Create and manage shops with:
  - Banner image URL
  - Shop name
  - Shop category
  - Shop floor
  - Contact number
  - Address
- Each shop is linked to the logged-in user

### 📦 Product Management

- Add, edit, delete products for your shop
- Store product data in backend MongoDB
- Full CRUD support with Axios API calls

### 💻 Frontend (React)

- React Context API for global state management (user, shop, products)
- Responsive UI with Tailwind CSS
- API requests made with Axios, using JWT for protected endpoints

## 🛠 Tech Stack

- Frontend : React, Context API, Axios, Tailwind CSS
- Backend : Node.js, Express.js
- Database : MongoDB
- Auth : JWT (JSON Web Token)
- Other : dotenv, cors, nodemon

## 📂 Project Structure

SuperMall/
├── backend/
│ ├── config/ # DB connection, environment variables
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose models (User, Shop, Product)
│ ├── routes/ # API routes
│ ├── server.js # Server entry point
│ └── app.js # Express app setup
│
├── frontend/
│ ├── src/
│ ├── context/ # AuthContext for global state
│ ├── pages/ # React pages (Login, Signup, Shop, etc.)
│ ├── components/ # Reusable components
│ └── App.jsx # Main app
│
└── README.md # This file

## ⚙️ Installation & Setup

1️⃣ Clone the repository

- git clone https://github.com/ArpitPareek26/SuperMall.git

- cd supermall

2️⃣ Backend Setup

- cd backend

- npm install

- Create a .env file inside backend/config/ with:

  - PORT=port
  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_secret_key
  - FRONTEND_URL=http://localhost:5173

- Run backend:
  - npm run dev

3️⃣ Frontend Setup

- cd frontend

- npm install

- Run frontend:
  - npm run dev

## 🔑 API Endpoints

- User Authentication

  - POST /api/users/signup – Register a new user
  - POST /api/users/login – Login user

- Shop Management (Protected)

  - POST /api/shops – Create a shop
  - GET /api/shops/myshop – Get logged-in user’s shop
  - PUT /api/shops/:id – Update shop
  - DELETE /api/shops/:id – Delete shop

- Product Management (Protected)
  - POST /api/products – Add product
  - GET /api/products/:shopId – Get shop products
  - PUT /api/products/:id – Update product
  - DELETE /api/products/:id – Delete product

🧑 Thank You
