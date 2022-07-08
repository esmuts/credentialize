// Import modules
import express from "express";
import users from "../controllers/users.controller.js";
import credentials from "../controllers/credentials.controller.js";

export const router = express.Router();

// User routes
router.get("/users/find", users.findAll);
router.get("/users/find/:id", users.findById);
router.get("/users/verify", users.verify);
router.post("/users/create", users.create);
router.post("/users/login", users.login);
router.put("/users/update/:id", users.update);

// Credential routes
router.get("/credentials/find", credentials.find);
router.get("/credentials/find/:id", credentials.findById);
router.get("/credentials/find/:unit/:division", credentials.findRepo);
router.post("/credentials/create", credentials.create);
router.put("/credentials/update/:id", credentials.update);
