# E-Commerce App

Welcome to the E-Commerce App! This app is a fully functional e-commerce platform designed to provide users with a seamless online shopping experience. Built with modern technologies, the app supports features like product browsing, cart management, order placement, and more.

---

## Features

### User Features:
- **User Authentication:** Secure user registration and login.
- **Product Browsing:** Explore products by category, price, and popularity.
- **Search Functionality:** Quickly find products with an advanced search bar.
- **Shopping Cart:** Add, remove, or update product quantities in the cart.
- **Order History:** View past orders and their statuses.
- **Wishlist:** Save products for later purchases.

### Admin Features:
- **Product Management:** Add, edit, or delete products.
- **Order Management:** View and manage user orders.
- **User Management:** Manage registered users.

---

## Technologies Used

### Frontend:
- React Native

### Backend:
- Node.js
- Express.js
- MongoDB (Database)

### Additional Tools:
- JWT (for authentication)
- Cloudinary (for image hosting)
- Stripe API (for payments)

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   ```

2. **Install Dependencies:**
   Navigate to both the `frontend` and `backend` directories and install the required packages:
   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the `backend` directory and include the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Start the App:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend app:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the App:**
   Open your mobile device emulator or connect a physical device to see the app running.

---

## Screenshots

### Home Page:
![Home Page](screenshots/home_page.png)
*Browse trending products and categories.*

### Product Page:
![Product Page](screenshots/product_page.png)
*View product details, add to cart, or save to wishlist.*

### Cart Page:
![Cart Page](screenshots/cart_page.png)
*Manage your selected items before checkout.*

### Admin Dashboard:
![Admin Dashboard](screenshots/admin_dashboard.png)
*Easily manage products, orders, and users.*

---

## Contribution

We welcome contributions to enhance the app! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to your branch and create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact

For any questions or feedback, feel free to contact us at:
- Email: support@ecommerceapp.com
- GitHub: [github.com/yourusername](https://github.com/yourusername)

Thank you for using the E-Commerce App!

