import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// middleware to parsing request body
app.use(express.json());

// middleware for handling CORS policy
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello!");
});

app.use("/books", booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
