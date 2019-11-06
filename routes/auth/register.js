const router = require('express').Router();

/* Endpoint: https://domain.com/register */

router.get('/', (req, res) => {
  res.render('register.ejs');
});

router.post('/', (req, res) => {
  req.body.email
});

module.exports = router;
