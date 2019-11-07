const router = require('express').Router();

// GET https://domain.tld/users
router.get('/', (req, res) => {
    res.render('users', { title: 'Users' });
});

module.exports = router;
