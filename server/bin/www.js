import app from "../app.js";
import { connectDB } from "../db/conn.js";

const port = process.env.PORT || 3001;

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
