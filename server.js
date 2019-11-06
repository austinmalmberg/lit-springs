if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// connect to the DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', (error) => console.log('Connection error:', error));
db.once('open', () => console.log('Connected to Mongoose'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(process.env.PORT || 3000);
