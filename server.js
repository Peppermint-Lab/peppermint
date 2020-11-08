// Dependencies
const express = require('express'); 
//const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

const connectDB = require('./config/DB');
dotenv.config({ path: './config/config.env'});

connectDB()

// DB models
require('./models/InternalUser')
require('./models/Ticket')


// Routes

// Static Files

// Express server for api and libraries
app.use(cors())
app.use(express.json())

// Morgan API Logger
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// Express web server PORT
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
    )
)