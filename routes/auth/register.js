const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// GET https://domain.com/register
router.get('/', (req, res) => {
  res.render('register.ejs', { title: 'Register' });
});

// POST https://domain.com/register
router.post('/', async (req, res) => {

  // TODO: redirect to login if email already exists

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    // add user to database
    user.save((err, newUser) => {

      if (err)
        res.redirect('/register');
      else
        res.redirect('/login');

    });
  } catch (error) {
    res.redirect('/register');
  }
});

module.exports = router;
