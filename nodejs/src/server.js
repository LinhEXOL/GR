import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config(); // giup chayj dc dong process.env

let app = express();
// Đặt giới hạn kích thước yêu cầu là 50MB (đơn vị: bytes)
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({ origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080; //Port === undefined => Port = 6060

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port: " + port);
});
