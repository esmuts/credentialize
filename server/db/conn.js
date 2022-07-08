/**
 * I consulted the following sites for help –
 * https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 * https://www.codegrepper.com/code-examples/javascript/node+mongoose+connection+in+es6
 * https://cloudnweb.dev/2019/04/mongoose-connection-in-express-js/
 * https://github.com/AntonioGomes42/DotEnv-with-ES6-COMMOM-JS-/tree/main/lib
 * https://stackoverflow.com/questions/65679092/typeerror-cannot-read-property-config-of-undefined-in-dotenv
 *
 *  */

import "dotenv/config";

import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.ATLAS_URI;

export async function connectDB() {
  await mongoose.connect(uri);
}
