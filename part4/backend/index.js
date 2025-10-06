import express from "express";
import mongoose from "mongoose";
import config from "./utils/config.js";
import BlogRoutes from "./controllers/BlogControllers.js";

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/api/blogs", BlogRoutes);

const PORT = config.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
