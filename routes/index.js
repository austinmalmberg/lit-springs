const router = require('express').Router();

// GET https://domain.tld/
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

module.exports = router;
