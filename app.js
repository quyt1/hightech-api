
//imprt module
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');


//routes
var userRouter = require('./modules/user-management/routes');
var brandRouter = require('./modules/brand-management/routes');
var categoryRouter = require('./modules/category-management/routes');
var productRouter = require('./modules/product-management/routes');
var cartRouter = require('./modules/cart-management/routes');
var orderRouter = require('./modules/order-management/routes');
var favoriteRouter = require('./modules/favorite-management/routes');
var bannerRouter = require('./modules/banner-management/routes');
var adminRouter = require('./modules/admin-management/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))


//
app.use('/access', userRouter);
app.use('/brand', brandRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/favorite', favoriteRouter);
app.use('/banner', bannerRouter);
app.use('/admin', adminRouter);


/*
* Swagger
*/
const swaggerJSDoc = require('swagger-jsdoc');
let schemes = ["http", "https"];
const options = {
  definition: {
    info: {
      title: 'HighTech REST API Documentation', // Title (required)
      description: `This is REST API Documentation for HighTech.`,
      version: '1.0.0', // Version (required),
    },
    schemes: schemes,
  },
  // Path to the API docs
  apis: ['./swagger_api_docs/**/*.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerDocument = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  customSiteTitle: 'HighTech REST API Documentation',
};
app.use('/docs', swaggerUi.serve, (...args) => swaggerUi.setup(swaggerDocument, swaggerOptions)(...args));
/*
* Swagger
*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(3001, () => {
//   console.log(`Server RESFUL is running on port 3000.`);
// });

module.exports = app;
