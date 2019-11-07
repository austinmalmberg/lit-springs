if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// premade requires
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// custom requires
const initializePassport = require('./passport-config');

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log('Connection error:', error));
db.once('open', () => console.log('Connected to Mongoose'));

// setup passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'));
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// gives the ability to use flash messages
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }  // recommended express-session option
}));

// initialize routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');

// assign routers to endpoints
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(process.env.PORT || 3000);
