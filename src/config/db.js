const mongoose = require("mongoose");
const debug = require("debug")("app:db");

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://demo_express_user:RBNTuqlUWSPMbOp5@expressdemo.hffembd.mongodb.net/ecommerce?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    debug("db connected!!");
  } catch (error) {
    debug(`error on connection: ${error}`);
  }
};

module.exports = connect;
