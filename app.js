const express = require("express");
const morgan = require('morgan')
const debug = require('debug')('app');


const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
