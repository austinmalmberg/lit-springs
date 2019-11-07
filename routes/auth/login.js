const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// GET https://domain.tld/login
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

// POST https://domain.tld/login
router.post('/', passport.authenticate('local', {
  sucessRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
