const express = require("express");
const debug = require('debug')('app');


const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
