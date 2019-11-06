const router = require('express').Router();

/* Endpoint: https://domain.com/login */

router.get('/', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {

});

module.exports = router;
