const router = require('express').Router();

/* Endpoint: https://domain.com/users */

router.get('/', (req, res) => {
    res.render('users.ejs', { name: "Austin" });
});

module.exports = router;
