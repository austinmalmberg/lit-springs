const router = require('express').Router();
const bcrypt = require('bcrypt');
const { createUser } = require('../../models/user');

// GET https://domain.tld/register
router.get('/', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST https://domain.tld/register
router.post('/', async (req, res) => {

  // TODO: redirect to login if email already exists

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  createUser(req.body.email, req.body.name, hashedPassword, (err, newUser) => {

    if (err) {

      console.log(`Could not register ${req.body.email}`);
      res.redirect('/register');

    } else {

      console.log(`New user created: ${req.body.email}`);
      res.redirect('/login');

    }

  });
});

module.exports = router;
