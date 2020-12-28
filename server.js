// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const connectDB = require("./config/DB");
dotenv.config({ path: "./config/.env" });

// DB models
require("./src/models/InternalUser");
require("./src/models/Ticket");
require("./src/models/todo");
require("./src/models/notes");
require("./src/models/client");
require("./src/models/news");

connectDB();

// Routes
const auth = require("./src/routes/auth");
const tickets = require("./src/routes/ticket");
const data = require("./src/routes/data");
const todo = require("./src/routes/todo");
const note = require("./src/routes/notes");
const client = require("./src/routes/client");
const news = require("./src/routes/news");

// Express server libraries
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Express API Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/tickets", tickets);
app.use("/api/v1/data", data);
app.use("/api/v1/todo", todo);
app.use("/api/v1/note", note);
app.use("/api/v1/client", client);
app.use("/api/v1/newsletter", news);

// Morgan API Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

// Express web server PORT
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "build/") });
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
