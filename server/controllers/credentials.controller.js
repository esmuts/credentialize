import { Credential } from "../models/credentials.model.js";

// Create object to hold all the user controller methods.
const credentials = {};

// Find all the credentials.
credentials.find = async (req, res) => {
  try {
    const result = await Credential.find();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// Finds all credentials matching requested unit and division.
credentials.findRepo = async (req, res) => {
  // Gets unit and division from URL paramaters.
  const unit = req.params.unit;
  const division = req.params.division;
  try {
    // Retrieves credentials from database
    const creds = await Credential.find({
      $and: [{ unit: unit }, { division: division }],
    });
    res.send(creds);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// Add a new credential to the database
credentials.create = async (req, res) => {
  // Create a new instance of Credential model and store credential details in it.
  let credential = new Credential({
    location: req.body.location,
    login: req.body.login,
    password: req.body.password,
    unit: req.body.unit,
    division: req.body.division,
  });
  // Save credential to the database
  try {
    await credential.save();
    res.send({ msg: "Credential added to the repository." });
  } catch (err) {
    res.send({ msg: err.message });
  }
};

// Finds a credential matching the requested ID.
credentials.findById = async (req, res) => {
  // Gets id value from URL parameter
  const id = req.params.id;
  try {
    // Retrieves the credential from the database
    const credential = await Credential.findById(id);
    res.send(credential);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// Updates an existing credential by rewriting it with updated values.
credentials.update = async (req, res) => {
  // Gets id value from parameter
  const id = req.params.id;
  try {
    // Finds and updates the record matching the request id.
    const result = await Credential.findOneAndUpdate(
      { _id: id },
      {
        location: req.body.location,
        login: req.body.login,
        password: req.body.password,
        unit: req.body.unit,
        division: req.body.division,
      },
      { new: true }
    );
    res.send({ msg: "Credential updated successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

export default credentials;
