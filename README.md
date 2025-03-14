Restaurant App Front-End

Description
This is the front-end application for a restaurant ordering system, built as part of a candidate exam. 
It provides functionalities for both customers and admin users, allowing for seamless order management and menu browsing.

Getting Started

Installation:

1. Install dependencies:
   npm install

2. Run the application:
   ng serve

3. The app will be available at http://localhost:4200/.
   ⚠️ Do not change the port (4200), as it is pre-configured in CORS on the backend.

Features

Authentication:
- Login Page – Users can log in with their credentials.
- Registration – New customers can sign up for an account.
- Forgot Password – Users can reset their password.

Customer Functionalities:
- Browse Menu – View available food items.
- Add to Cart – Select and add items to the cart.
- Checkout – Proceed with an order.

Admin Functionalities:
- Manage Menu – Add, update, or remove menu items.
- Manage Customer Profiles – View and manage customer details.
- Manage Orders – Process and track customer orders.

Technologies Used:
- Angular (Front-end framework)
- TypeScript
- SCSS/CSS (for styling)

Notes:
- Ensure that the backend API is running and configured correctly to allow requests from port 4200.
