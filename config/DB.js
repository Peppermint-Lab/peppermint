// imports mongoose which connects to the mongodb database
const mongoose = require("mongoose");

// Function which inits the connect to the db,
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_DEV, {
      // uses the mongo_uri in the .env file to connect
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB Connected: ${conn.connection.host}`.cyan.bold); // Prints out if connected in the console
  } catch (err) {
    console.log(`Error: ${err.message}`.red); // Prints out if fails to connect
    process.exit(1);
  }
};

// exports so it can be called in server.js
module.exports = connectDB;
