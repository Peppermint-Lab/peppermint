// Dependencies
const express = require('express'); 
//const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const passport = require('passport');

const expressSession = require('express-session')({
    secret: '&wW!qJ3eksbWbTX^',
    resave: false,
    saveUninitialized: false
  });

const connectDB = require('./config/DB');
dotenv.config({ path: './config/config.env'});

connectDB()

// DB models
require('./models/InternalUser')
require('./models/Ticket')


// Routes
const users = require('')

// Static Files

// Express server for api and libraries
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT LOCAL AUTHENTICATION
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

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