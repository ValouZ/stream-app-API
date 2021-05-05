var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var debug = require("debug")("node-express-test:server");
var http = require("http");
const {
  userJoin,
  getCurrentUSer,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

// S'assurer que la classe USER ai bien été chargé
require("./models/User");

mongoose
  .connect(
    "mongodb+srv://fanny34:Fanny34@cluster0.bhd1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connexion ok");
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { Server } = require("http");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Serveur

/**
 * Module dependencies.
 */

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const botName = "Bot";

io.on("connection", (socket) => {
  console.log("Nouvelle connexion");

  // Quand on rejoint la room
  socket.on("joinRoom", ({ id, username, room, color }) => {
    const user = userJoin(id, username, room, color);

    socket.join(user.room);

    // Message de bienvenue
    socket.emit("chat message", {
      username: botName,
      msg: "Bienvenue sur le live",
    });

    // Message à tous les users
    socket.broadcast.to(user.room).emit("chat message", {
      username: botName,
      msg: `${user.username} a rejoint le live`,
    });

    // Envoyer info user et room
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    // Réception et envoie du msg
    socket.on("chat message", (msg) => {
      io.to(user.room).emit("chat message", {
        username: user.username,
        msg: msg,
        color: user.color,
      });
    });

    // Deconnexion
    socket.on("disconnect", () => {
      const userLeft = userLeave(user.id);
      if (userLeft) {
        io.to(user.room).emit("chat message", {
          username: botName,
          msg: `${user.username} a quitté le live`,
        });
        console.log("Déconnexion !");

        // Envoyer info user et room
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
