
const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/db');

// User login route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (user.role === 'admin') {
                res.redirect('../admin/dashboard');
            } else {
                res.sendFile(path.join(__dirname, '../views/index.html'));
            }
        } else {
            res.send('Incorrect email or password');
        }
    });
});

// Home route
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Apply leave routes
router.get('/apply_leave', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/apply_leave.html'));
});

router.post('/apply_leave', (req, res) => {
    const { userID, leaveType, startDate, endDate, reason } = req.body;
    const leaveRequest = { userID, leaveType, startDate, endDate, reason, status: 'pending' };
    db.query('INSERT INTO LeaveRequests SET ?', leaveRequest, (err, result) => {
        if (err) throw err;
        res.redirect('/view_status');
    });
});

// View leave status routes
router.get('/view_status', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/view_status.html'));
});

router.get('/api/leave_status', (req, res) => {
    const userID = 1; 
    db.query('SELECT * FROM LeaveRequests WHERE userID = ?', [userID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
