//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');
var configValues = require('./config/configValues')

app.set('view engine', 'ejs');
require('dotenv').config();



const { mongoDB } = require('./config/configValues');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: configValues.frontendURL, credentials: true }));

//use express session to maintain session data
// app.use(session({
//     secret              : 'cmpe273_kafka_passport_mongo',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

//require('./config/passport')(passport);

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', configValues.frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//mongodb connection
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});




app.use(express.json());
var studentRouter = require('./api/student/student.router');
var categoryRouter = require('./api/category/category.router');
var cardRouter = require('./api/card/card.router');
var addressRouter = require('./api/address/address.router');
var loginRouter = require('./api/login/login.router');
var productRouter = require('./api/product/product.router');
var cartRouter = require('./api/cart/cart.router');
var sellerRouter = require('./api/seller/seller.router');
var customerRouter = require('./api/customer/customer.router');
var signupRouter = require('./api/signup/signup.router');
var ordersRouter = require('./api/orders/orders.router');
var sellerinventoryRouter = require('./api/sellerinventory/sellerinventory.router');
var checkoutRouter = require('./api/checkout/checkout.router');


app.use('/student', studentRouter);
app.use('/category', categoryRouter);
app.use('/card', cardRouter);
app.use('/address', addressRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/seller', sellerRouter);
app.use('/customer', customerRouter);
app.use('/orders', ordersRouter);
app.use('/sellerinventory',sellerinventoryRouter);
app.use('/checkout', checkoutRouter);

//start your server on port 3001
module.exports = app.listen(3001);
console.log("Server Listening on port 3001");