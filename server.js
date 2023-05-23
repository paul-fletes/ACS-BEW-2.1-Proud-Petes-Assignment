if (!process.env.PORT) {
  require('dotenv').config() // load .env file if not in production
  process.env.NODE_ENV = "dev"
}

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); // serves favicon.ico file located in /public
const logger = require('morgan'); // logs HTTP requests to the console
const cookieParser = require('cookie-parser'); // parses cookies attached to incoming requests to make available in `req.cookies`
const bodyParser = require('body-parser'); // parses HTTP request body. Available under the `req.body` property
const methodOverride = require('method-override') // allows us to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// view engine setup to use Pug templates located in /views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves static files located in /public
app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


require('./routes/index.js')(app);
require('./routes/pets.js')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
