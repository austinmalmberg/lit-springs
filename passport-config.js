const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { findUserById, findUserByEmail } = require('./models/user');

function initialize(passport) {
  passport.use(new LocalStrategy({ emailField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, findUserById(id)));
}

function authenticateUser(email, password, done) {

  return findUserByEmail(email, async (err, user) => {

    if (err) {
      console.log('Database Lookup Error:', err);
      return done(null, false, { message: 'Please try again later' });

    } else if (!user) {

      console.log(`Database Lookup Error: Failed to find ${email}`);
      return done(null, false, { message: 'Email address not found' });

    } else {

      // check the password provided against the password hash stored in the database
      const matches = await bcrypt.compare(password, user.password);

      if (matches) {

        console.log(`Successful login by ${user.name}`);
        return done(null, user, { message: 'Login successful' });

      } else {

        console.log(`Failed login attempt by ${user.name}`);
        return done(null, false, { message: 'Password incorrect' });
      }

    }

  });
};

module.exports = initialize;
