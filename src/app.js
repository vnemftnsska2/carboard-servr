const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("../middleware/auth");

//Router
const AppRouter = require("./routes/app.routes");
const FileRouter = require("./routes/file.routes");
const TaskRouter = require("./routes/task.routes");

class App {
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3030);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use("uploads", express.static("uploads"));
    // Cors
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
  }

  routes() {
    this.app.use("/api", AppRouter);
    this.app.use("/api", TaskRouter);
    this.app.use(FileRouter);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Carboard API Server On Port", this.app.get("port"));
  }
}

module.exports = App;
