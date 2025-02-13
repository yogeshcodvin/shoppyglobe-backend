## ShoppyGlobe E-commerce API
- A Node.js and Express.js backend for the ShoppyGlobe e-commerce application with MongoDB for data storage.

## Features
- Product Management: Fetch all products, get product details, and manage inventory.
- Shopping Cart: Add, update, and remove items from the cart.
- User Authentication: Register and login with JWT authentication.
- MongoDB Integration: Stores product and cart data in a database.


## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT (JSON Web Token)
API Testing: Thunder Client / Postman


###  Installation & Setup

## Clone the repository:

'''
git clone https://github.com/yourusername/shoppyglobe-api.git
cd shoppyglobe-api
'''
## Install dependencies:

'''
npm install
'''

## Create a .env file and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_secret_key


## Start the server:
'''
npm start
Server will run at http://localhost:5000/
'''

## API Endpoints
Product Routes
- GET /products → Fetch all products
- GET /products/:id → Fetch product by ID

Cart Routes
- POST /cart → Add a product to the cart
- PUT /cart/:id → Update cart item quantity
- DELETE /cart/:id → Remove item from cart

Authentication Routes
- POST /register → Register a new user
- POST /login → Authenticate user and return JWT
