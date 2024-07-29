
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (user.role === 'admin') {
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/home');
            }
        } else {
            res.send('Incorrect email or password');
        }
    });
});

router.get('/home', (req, res) => {
    res.render('index');
});

module.exports = router;
