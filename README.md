Markdown# User Management REST API

A lightweight, production-ready RESTful CRUD API built with **Node.js** and **Express.js** for managing user records.

## Features
* Complete CRUD operations (Create, Read, Update, Delete) for users.
* In-memory data store (easily swappable with MongoDB, PostgreSQL, etc.).
* Standardized JSON responses with proper HTTP status codes.

---

## Getting Started

### Prerequisites
* **Node.js** (v18+ recommended) installed on your system.

### Installation & Setup

1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd user-management-api


1. Get All Users
Retrieves an array of all users currently stored in the system.
URL: /users
Method: GET
Success Response (200 OK):JSON{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 28
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "age": 34
    }
  ]
}
2. Get User By ID
Retrieves details of a single user by their unique identifier.
URL: /users/:id
Method: GET
URL Params:id (string, required) - The unique user ID.
Success Response (200 OK):JSON{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 28
  }
}
Error Response (404 Not Found):JSON{
  "success": false,
  "message": "User not found"
}
3. Create User
Adds a new user to the system.
URL: /users
Method: POST
Headers: Content-Type: application/json
est Body (json):JSON.stringify{
  "name": "Alex Johnson",
  "email": "alex.j@example.com",
  "age": 25
}
(Note: name and email are required fields. age is optional.)
Success Response (201 Created):JSON{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "1710000000000",
    "name": "Alex Johnson",
    "email": "alex.j@example.com",
    "age": 25
  }
}
Error Response (400 Bad Request):JSON{
  "success": false,
  "message": "Please provide both name and email"
}
4. Update User
Updates existing properties of a user. 
You can update single fields or all fields at once.
URL: /users/:id
Method: PUT
Headers: Content-Type: application/json
URL Params:id (string, required) - The unique user ID.
Request Body (json - all fields are optional):JSON{
  "age": 26
}
Success Response (200 OK):JSON{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 26
  }
}
Error Response (404 Not Found):JSON{
  "success": false,
  "message": "User not found"
}
5. Delete User
Removes a user record permanently from the system based on their ID.
URL: /users/:id
Method: DELETE
URL Params:id (string, required) - The unique user ID.
Success Response (200 OK):JSON{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 26
  }
}
Error Response (404 Not Found):JSON{
  "success": false,
  "message": "User not found"
}