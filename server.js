const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: "*"
}))


// Helper function to read users from users.json
const readUsers = () => {
  if (!fs.existsSync(DATA_FILE)) {
    // If file doesn't exist, return default initial users and create the file
    const initialUsers = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', age: 28 },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', age: 34 }
    ];
    writeUsers(initialUsers);
    return initialUsers;
  }
  const fileData = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
};

// Helper function to write users to users.json
const writeUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// =====================
// CRUD ROUTES
// =====================

/**
 * @route   GET /api/users
 * @desc    Get all users
 */
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 */
app.get('/api/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @route   POST /api/users
 * @desc    Create a new user (Supports manual ID entry)
 */
app.post('/api/users', (req, res) => {
  const { id, name, email, age } = req.body;
  const users = readUsers();

  // Simple validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and email'
    });
  }

  // Determine user ID (Use manually provided ID or generate one if missing)
  const userId = id ? id.toString() : Date.now().toString();

  // Check if manual ID already exists
  if (users.some(u => u.id === userId)) {
    return res.status(400).json({
      success: false,
      message: `User with ID '${userId}' already exists`
    });
  }

  const newUser = {
    id: userId,
    name,
    email,
    age: age || null
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update an existing user (Supports changing ID manually)
 */
app.put('/api/users/:id', (req, res) => {
  const { id, name, email, age } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // If a new manual ID is passed in body, check if it conflicts with another user
  if (id && id.toString() !== req.params.id) {
    if (users.some(u => u.id === id.toString())) {
      return res.status(400).json({
        success: false,
        message: `User with ID '${id}' already exists`
      });
    }
  }

  // Update fields if provided
  users[userIndex] = {
    ...users[userIndex],
    id: id !== undefined ? id.toString() : users[userIndex].id,
    name: name !== undefined ? name : users[userIndex].name,
    email: email !== undefined ? email : users[userIndex].email,
    age: age !== undefined ? age : users[userIndex].age
  };

  writeUsers(users);

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 */
app.delete('/api/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const deletedUser = users.splice(userIndex, 1);
  writeUsers(users);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser[0]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});