import express from "express"; // Framework to build web applications and APIs
import mongoose from "mongoose"; // ODM library
import routes from "./routes/index.js"; // Importing routes module
const helmet = require("helmet"); //Security for HTTP headers
import rateLimit from "express-rate-limit"; //Rate limit middleware

const PORT = 3000;

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minuties limit
  max: 200, // This will limit an IP adress to 100 requests per windowMs
  message: "Request limit reached, you have been disabled for 20 minutes",
});

app.use(limiter);

app.use(express.json()); // This will allow Express to parse JSON in request bodies in Postman

app.use("/api", routes);

mongoose
  .connect(
    "mongodb+srv://naomitomasson:Bellingen28@cluster0.paee5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ) //My MongoDB connection string!
  .then(() => console.log("Congratulations! MongoDB is connected!"))
  .catch((err) => console.error("MongoDB had a connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
