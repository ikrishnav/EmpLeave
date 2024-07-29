
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/apply', (req, res) => {
    res.render('apply_leave');
});

router.post('/apply', (req, res) => {
    const { userID, leaveType, startDate, endDate, reason } = req.body;
    const leaveRequest = { userID, leaveType, startDate, endDate, reason, status: 'pending' };
    db.query('INSERT INTO LeaveRequests SET ?', leaveRequest, (err, result) => {
        if (err) throw err;
        res.redirect('/leave/status');
    });
});

router.get('/status', (req, res) => {
    res.render('view_status');
});

router.get('/api/status', (req, res) => {
    const userID = 1; 
    db.query('SELECT * FROM LeaveRequests WHERE userID = ?', [userID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
