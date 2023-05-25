# Online Store Backend

This repository contains the backend application of an educational online store project. It provides functionalities for managing products, users, cart, orders, authentication, and related operations.

The frontend web client is available at the following link: [react-store-frontend](https://github.com/Desunovu/react-store-frontend)

## Technologies and Tools

The project uses the following technologies and tools:

- **Programming Language**: Python
- **Framework**: Flask
- **Object-Relational Mapping (ORM)**: SQLAlchemy
- **Database**: PostgreSQL
- **File Storage**: MinIO
- **API**: GraphQL API
- **GraphQL Library**: Ariadne
- **Containerization**: Docker

## Requirements

To run this application, the following requirements must be met:

- Python 3.10 or higher
- Docker and Docker Compose (if running the application using Docker)

## Installation and Usage

To install and run the application, follow these steps:

1. Clone the repository: `git clone https://github.com/Desunovu/graphql-store-backend.git`.
2. Navigate to the project directory.
3. Edit the `.env` file, specifying the device address in the local network for the `MINIO_ENDPOINT` and `POSTGRES_HOST` variables.

### Running with Docker

4. Execute docker-compose up to launch the application, along with the required services.

### Running without Docker

4. Install the dependencies: `pip install -r requirements.txt`.
5. Set the `FLASK_APP` environment variable to "api".
6. Run the application: `flask run`.

## GraphQL API

The API provides the following mutations:

1. `createUser`: Register a new user.
2. `updateUser`: Update user information.
3. `deleteUser`: Delete a user.
4. `assignAdmin`: Assign admin role to a user.
5. `addProduct`: Add a new product.
6. `updateProduct`: Update product information.
7. `deleteProduct`: Delete a product.
8. `addCategory`: Create a new category.
9. `removeCategory`: Remove a category.
10. `addReview`: Leave or update a review.
11. `removeReview`: Delete a review.
12. `createOrder`: Create a new order.
13. `updateOrderStatus`: Update the status of an order.
14. `addProductToFavorites`: Add a product to favorites.
15. `createCharacteristic`: Create a new characteristic.
16. `deleteCharacteristic`: Delete a characteristic.
17. `addProductToCart`: Add a product to the shopping cart.
18. `removeProductFromCart`: Remove a product from the shopping cart.
19. `setProductCharacteristicValue`: Set a value for a product characteristic.

And the following queries:

- `loginUser`: Obtain an authorization token.
- `getUser`: Get user information.
- `getUsers`: Get a list of users.
- `getProduct`: Get product information.
- `getProducts`: Get a list of products.
- `getCart`: Get cart information.
- `getCategories`: Get a list of categories.
- `getOrders`: Get a list of orders.
- `getFavoriteProducts`: Get a list of favorite products.
- `getCharacteristics`: Get a list of available characteristics.
