const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeLeaveDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Modular routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// Use the modular routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
