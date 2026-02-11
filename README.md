# Node.js REST API - Demo Project

## Overview

This is a simple but realistic REST API backend built with Node.js and Express. It demonstrates a basic product and user management system with CRUD operations. **This project is intentionally designed with incomplete test coverage and code quality issues to demonstrate AI-powered code review and automated test generation capabilities.**

## Project Structure

```
NodeRESTAPI/
├── src/
│   ├── config/
│   │   └── database.js           # In-memory database simulation
│   ├── controllers/
│   │   ├── productController.js  # Product business logic
│   │   └── userController.js     # User business logic
│   ├── models/
│   │   ├── product.js            # Product model class
│   │   └── user.js               # User model class
│   ├── routes/
│   │   ├── products.js           # Product API routes
│   │   └── users.js              # User API routes
│   ├── middleware/
│   │   ├── validation.js         # Input validation middleware
│   │   └── errorHandler.js       # Global error handling
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
├── tests/
│   ├── products.test.js          # Product controller tests (partial)
│   └── users.test.js             # User controller tests (partial)
├── jest.config.js                # Jest test framework configuration
├── package.json                  # Project dependencies
├── .gitignore                    # Git ignore file
└── README.md                     # This file
```

## Features

- **Product Management**: Create, read, update, delete products with stock management
- **User Management**: Create, read, update, delete users with role-based access
- **Search Functionality**: Search products by keyword, price range
- **Stock Operations**: Decrease stock for products
- **Admin Promotion**: Promote users to admin role
- **Error Handling**: Centralized error handling middleware
- **Input Validation**: Request validation middleware for product and user endpoints

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/filter?keyword=...&minPrice=...&maxPrice=...` - Search products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/decrease-stock` - Decrease product stock

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/profile` - Get user profile with stats
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/promote` - Promote user to admin

### Health Check
- `GET /health` - Health check endpoint

## Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

3. **Development mode** (with auto-reload if nodemon is installed):
   ```bash
   npm run dev
   ```

## Testing

This project includes Jest tests with intentionally low coverage to demonstrate automated test generation capabilities.

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

### Current Test Coverage
The project currently has **~40% test coverage** with intentional gaps:
- ✅ Partial coverage for `getAllProducts` and `getProductById`
- ✅ Partial coverage for `getAllUsers` and `getUserById`
- ❌ No tests for `searchProducts` functionality
- ❌ Incomplete tests for `deleteProduct` and `deleteUser`
- ❌ No tests for `promote-to-admin` endpoint
- ❌ No tests for authentication and authorization
- ❌ Missing edge case coverage (empty inputs, boundary values, etc.)

## Known Issues (Intentional)

The following issues are intentionally included for demonstration purposes:

### Code Quality Issues
1. **Missing null checks** - Several functions don't validate null/undefined inputs
2. **Hardcoded values** - Hardcoded minimum discount, admin ID, and IDs
3. **Inconsistent naming** - Mixed naming conventions (e.g., `validateProduct` vs `productValidate`)
4. **Lack of comments** - Some critical functions lack documentation
5. **Missing error handling** - Some edge cases not properly handled

### Security Issues
1. **Hardcoded credentials** - Default admin credentials in code
2. **No authorization checks** - Users can perform admin operations
3. **No permission validation** - Users can delete other users without checks
4. **Email uniqueness** - Partial validation, can be exploited

### Test Coverage Gaps
1. **Untested modules** - Database configuration not tested
2. **Incomplete test cases** - Many edge cases not covered
3. **Missing validation tests** - Input validation middleware not fully tested
4. **No integration tests** - No end-to-end API tests

## Example Usage

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "price": 149.99,
    "stock": 20,
    "category": "electronics"
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_doe",
    "email": "jane@example.com",
    "role": "user"
  }'
```

### Search Products
```bash
curl "http://localhost:3000/api/products/search/filter?keyword=laptop&minPrice=500&maxPrice=1500"
```

## Purpose

This project is designed specifically to serve as a **test bed for AI-powered code review and test generation tools**. It includes:

- ✅ Realistic project structure
- ✅ Production-like code patterns
- ✅ Intentional quality gaps for detection
- ✅ Partial test coverage for analysis
- ✅ Multiple API endpoints for analysis
- ❌ Enough issues to make code review valuable
- ❌ Gaps in test coverage for generation demonstration

## Future Improvements

Based on AI-powered code review and automated test generation, this project could be enhanced with:

- Comprehensive test coverage (100%)
- Input validation improvements
- Authorization middleware
- Database migration system
- API documentation (Swagger/OpenAPI)
- Logging and monitoring
- Rate limiting
- Caching mechanisms

## License

MIT

## Author

Demo Project for AI Code Review Tool Demonstration
