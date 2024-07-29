const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/dashboard', (req, res) => {
    res.render('admin_dashboard');
});

router.get('/api/all_leave_requests', (req, res) => {
    db.query('SELECT LeaveRequests.*, Users.username FROM LeaveRequests JOIN Users ON LeaveRequests.userID = Users.userID', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/api/approve_leave', (req, res) => {
    const { requestID } = req.body;
    db.query('UPDATE LeaveRequests SET status = "approved" WHERE requestID = ?', [requestID], (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

router.post('/api/remove_leave', (req, res) => {
    const { requestID } = req.body;
    db.query('DELETE FROM LeaveRequests WHERE requestID = ?', [requestID], (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
