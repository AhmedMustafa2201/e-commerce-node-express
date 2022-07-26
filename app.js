const express = require("express");
const morgan = require('morgan')
const debug = require('debug')('app');
const path = require('path');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const productsRouter = require("./src/routes/productRouter");
const authRouter = require("./src/routes/authRouter");
const adminRouter = require("./src/routes/adminRouter");


const PORT = process.env.PORT || 3000;
const app = express();

require('./src/config/db')()

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser())
app.use(
  session({
    secret: "ecommerce-express-secret",
    resave: false,
    saveUninitialized: false,
  })
);
require('./src/config/passport')(app)

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {user: req.user})
})

app.get('/home', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  debug(`listening on port ${PORT}`);
});
