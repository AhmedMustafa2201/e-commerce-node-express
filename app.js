const express = require("express");
const morgan = require('morgan')
const debug = require('debug')('app');
const path = require('path');
require('dotenv').config()

const productsRouter = require("./src/routes/productRouter");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/home', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  debug(`listening on port ${PORT}`);
});
