const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
//parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
//cors
app.use(cors());

if (process.env.NODE_ENV === "production") {
  //crear un archivo donde se loguearan todas las peticiones entrantes y detalles de ello.
  const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  app.use(morgan("dev"));
  require("dotenv").config();
}

const PORT = 3005;
app.use(express.static(path.join(__dirname, "client/build")));
const shelterRoutes = require("./api/routes/shelter");

app.use("/albergue", shelterRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT);
