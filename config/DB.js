// imports mongoose which connects to the mongodb database
const mongoose = require("mongoose");
const { exec } = require('child_process');

// Function which inits the connect to the db,
const connectDB = async () => {
  if(process.env.NODE_ENV === 'production') {
     db = process.env.MONGO_URI_DOCKER
  } else {
    db = process.env.MONGO_URI_DEV
  }
  try {
    const conn = await mongoose.connect(db.toString(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB Connected: ${conn.connection.host}`.cyan.bold); // Prints out if connected in the console
    exec(`seed -u ${db} ./data`, (err, stdout, stderr) => {
      if (err) {
        return;
      }
      console.log("Seeding completed".cyan.bold)
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red); // Prints out if fails to connect
    process.exit(1);
  }
};

// exports so it can be called in server.js
module.exports = connectDB;