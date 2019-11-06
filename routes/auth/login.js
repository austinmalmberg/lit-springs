const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// GET https://domain.com/login
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

// POST https://domain.com/login
router.post('/', async (req, res) => {

  try {
    User.findOne({ email: req.body.email }, (err, user) => {

      if (err) {
        res.render('login', { error: 'There was an error in the query' });
      }

      bcrypt.compare(req.body.password, user.password, (err, access) => {

        if (err)
          res.render('login', { error: 'Passwords do not match' });

        res.redirect('/users');
      });


    });

  } catch (error) {
    res.redirect('/login', { error: 'There was another problem'});
  }
});

module.exports = router;
