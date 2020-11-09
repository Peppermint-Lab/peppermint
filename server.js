// Dependencies
const express = require('express'); 
//const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser')

const connectDB = require('./config/DB');
dotenv.config({ path: './config/config.env'});

connectDB()

// DB models
require('./models/InternalUser')
require('./models/Ticket')


// Routes
const auth = require('./routes/auth')
const tickets = require('./routes/ticket');

// Static Files


// Express server libraries
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express API Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/tickets', tickets);

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