const router = require('express').Router();

/* Endpoint: https://domain.com/ */

router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome'});
});

module.exports = router;
