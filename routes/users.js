const router = require('express').Router();

// GET https://domain.com/users
router.get('/', (req, res) => {
    res.render('users.ejs', { title: 'Users' });
});

module.exports = router;
