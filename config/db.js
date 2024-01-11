const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected...");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

connectDB();
