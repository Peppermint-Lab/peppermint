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
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const fs = require("fs");
const readline = require("readline");

const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
// const methodOverride = require('method-override');

const connectDB = require("./config/DB");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

// DB models
require("./src/models/InternalUser");
require("./src/models/Ticket");
require("./src/models/todo");
require("./src/models/notes");
require("./src/models/client");
require("./src/models/news");
require("./src/models/Log");
require("./src/models/file");

connectDB();
let url = null;
if (process.env.NODE_ENV === "production") {
  url = process.env.MONGO_URI_DOCKER;
} else {
  url = process.env.MONGO_URI_DEV;
}

console.log(process.env.MONGO_URI_DOCKER)

// create storage engine
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

// Routes
const auth = require("./src/routes/auth");
const tickets = require("./src/routes/ticket");
const data = require("./src/routes/data");
const todo = require("./src/routes/todo");
const note = require("./src/routes/notes");
const client = require("./src/routes/client");
const news = require("./src/routes/news");
const times = require("./src/routes/time");
const uploadRouter = require("./src/routes/uploads");

// Express server libraries
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());

let accessLogStream = fs.createWriteStream(path.join(__dirname, "api.txt"), {
  flags: "a",
});

// Express API Routes
app.use(
  "/api/v1/auth",
  morgan("tiny", { stream: accessLogStream }),
  limiter,
  auth
);
app.use(
  "/api/v1/tickets",
  morgan("tiny", { stream: accessLogStream }),
  tickets
);
app.use("/api/v1/data", morgan("tiny", { stream: accessLogStream }), data);
app.use("/api/v1/todo", morgan("tiny", { stream: accessLogStream }), todo);
app.use("/api/v1/note", morgan("tiny", { stream: accessLogStream }), note);
app.use("/api/v1/client", morgan("tiny", { stream: accessLogStream }), client);
app.use(
  "/api/v1/newsletter",
  morgan("tiny", { stream: accessLogStream }),
  news
);
app.use("/api/v1/time", morgan("tiny", { stream: accessLogStream }), times);
app.use("/api/v1/uploads", uploadRouter(upload));

// Express web server PORT
const PORT = process.env.PORT;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "build/") });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// Set up socket.io
const io = socket(server);
let online = 0;

function convert(file) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file);
    // Handle stream error (IE: file not found)
    stream.on("error", reject);

    const reader = readline.createInterface({
      input: stream,
    });

    const array = [];

    reader.on("line", (line) => {
      array.push(line);
    });

    reader.on("close", () => resolve(array));
  });
}

io.on("connection", (socket) => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit("visitor enters", online);
  convert("./api.txt").then((res) => {
    io.emit("file", res);
  });

  socket.on("disconnect", () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit("visitor exits", online);
  });
});
