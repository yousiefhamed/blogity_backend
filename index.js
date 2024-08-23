const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const usersRoutes = require("./routes/usersRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Blog Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
