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

- `createUser`: Register a new user.
- `updateUser`: Update user information.
- `uploadAvatar`: Upload a user's avatar
- `deleteUser`: Delete a user.
- `assignAdmin`: Assign admin role to a user.
- `addProduct`: Add a new product.
- `updateProduct`: Update product information.
- `deleteProduct`: Delete a product.
- `addCategory`: Create a new category.
- `removeCategory`: Remove a category.
- `addReview`: Leave or update a review.
- `removeReview`: Delete a review.
- `createOrder`: Create a new order.
- `updateOrderStatus`: Update the status of an order.
- `addProductToFavorites`: Add a product to favorites.
- `removeProductFromFavorites`: Remove a product from favorites.
- `createCharacteristic`: Create a new characteristic.
- `deleteCharacteristic`: Delete a characteristic.
- `addProductToCart`: Add a product to the shopping cart.
- `removeProductFromCart`: Remove a product from the shopping cart.
- `setProductCharacteristicValue`: Set a value for a product characteristic.

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
