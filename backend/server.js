require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/database.js");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))

app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/movie", require("./routes/movieRoutes.js"));

//Frontend
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))
}else{
  app.use(express.static(path.join(__dirname, "../frontend/public/")));
}

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server Started on Port: ${PORT}`));