import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import api from "./routes/api.js";
import socketsEventsChat from "./sockets/chat.socket.js";
import __dirname from "./utils.js";
import login from "./routes/login.js";

//INITIALIZATIONS
const HttpServer = http.Server;
const IOserver = Server;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);

//SETTINGS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("port", process.env.PORT || 8080);
const PORT = app.get("port");
const mongoConf = { useNewUrlParser: true, useUnifiedTopology: true };

//STATIC FILES
app.use("/static", express.static(__dirname + "/public"));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mateo:mateo123@cluster0.kcavv9s.mongodb.net/session?retryWrites=true&w=majority",
      mongoConf,
    }),
    secret: "coderHouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 10000,
    },
  })
);

//ROUTES
app.use("/", login);
app.use("/api", api);

socketsEventsChat(io);

httpServer.listen(PORT, (err) => {
  if (err) {
    console.log(`server error: ${err}`);
  }
  console.log(`Server listen PORT : ${PORT}`);
});
