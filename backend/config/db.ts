require("dotenv").config(); // load .env variables
var mongoose = require("mongoose"); //import fresh mongoose object
// import merced logger
const { log } = require("mercedlogger");

//DESTRUCTURE ENV VARIABLES
const { DATABASE_URL } = process.env;

// CONNECT TO MONGO
mongoose.connect = mongoose.connect(DATABASE_URL!);

// CONNECTION EVENTS
mongoose.connection
  .on("open", () => log.green("DATABASE STATE", "Connection Open"))
  .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
  .on("error", (error: any) => log.red("DATABASE STATE", error));

// EXPORT CONNECTION
module.exports = mongoose;
