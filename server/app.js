/**
 * IFSL3T35 Capstone Project V: Authentication
 *
 * @author Eckard Smuts
 *
 * I consulted the following sites for help:
 *
 * MongoDB Schema design –
 * https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
 * https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/?_ga=2.178370605.847299696.1654325371-2074914593.1654325371
 *
 * Using ObjectId type in Mongoose Schemas –
 * https://www.mongodb.com/community/forums/t/how-use-objectid-search-from-webhook-in-mongodb/102081
 * https://stackoverflow.com/questions/29078753/how-to-reference-another-schema-in-my-mongoose-schema
 * https://mongoosejs.com/docs/populate.html
 *
 * Constructing queries in Mongoose –
 * https://kb.objectrocket.com/mongo-db/and-in-mongoose-1017
 *
 * Using jsonwebtoken with ES6 –
 * https://stackoverflow.com/questions/64275668/es6-imports-for-jwt
 *
 * Using 'concurrently' package –
 * https://javascript.plainenglish.io/how-to-handle-cors-in-express-how-to-run-express-server-and-react-client-concurrently-a76d551a8553
 *
 */

// App imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes/routes.js";

const app = express();

// App middleware

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(helmet());

// App functionality

app.get("/", (req, res) =>
  res.json({ message: "Welcome to Credentialize version 1.0" })
);

export default app;
