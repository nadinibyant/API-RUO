var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const server = require('./routes/index')
const fs = require('fs').promises;
const multer = require('multer')
const cors = require('cors')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Route untuk menampilkan daftar file dan folder di dalam "public"
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookieParser());
app.set('view engine', false);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fotoPsikolog', express.static('public/images/therapy'));
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/', server.users);
app.use('/', server.therapy)
app.use('/', server.chatTerry)
app.use('/', server.profile)
app.use('/', server.message)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  } else {
    next(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
