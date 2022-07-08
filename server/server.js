// I have adapted the following guide for project structure and boilerplate:
// https://www.mongodb.com/languages/mern-stack-tutorial

import express from "express";
import cors from "cors";
import { connectDB } from "./db/conn.js";
// import "./routes/record.js";

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/manage", routes);

app.listen(port, () => {
  // perform a database connection when server starts
  connectDB()
    .then(() => {
      console.log(`Server is listening on port: ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
