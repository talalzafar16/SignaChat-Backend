require("dotenv").config();
const express = require("express");
require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/routes");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

// Router
app.use("/api/v1", router);

// Test Api
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
