const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");

// ROUTE
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const movieRoute = require("./routes/movies.route");
const listRoute = require("./routes/lists.route");

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 5000;

// connected to DB
const connectedDB = require("./db/connect");
connectedDB();

// ROUTE
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
