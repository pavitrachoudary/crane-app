const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MIDDLEWARE (keep here)
app.use(cors());
app.use(express.json());

// ✅ ADD ROUTES HERE 👇
const craneRoutes = require("./routes/craneRoutes");
app.use("/api/cranes", craneRoutes);
const operatorRoutes = require("./routes/operatorRoutes");
app.use("/api/operators", operatorRoutes);
const earningRoutes = require("./routes/earningRoutes");
app.use("/api/earnings", earningRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));