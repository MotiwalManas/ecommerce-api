# E-Commerce API

This is a simple Node.js-based REST API for an e-commerce system. It includes features for managing products, variants, and search functionality.

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
git clone https://github.com/your-username/e-commerce-api.git


2. Navigate to the project directory:
cd e-commerce-api

3. Install dependencies:
npm install


### Running the API
npm start



The API will be running at [http://localhost:8000](http://localhost:8000) by default.

## API Endpoints

### Create a new product
POST /products

### Update an existing product
PUT /products/:id

### Delete an existing product
DELETE /products/:id


### Retrieve all products
GET /products


### Search products
GET /products?search=query


