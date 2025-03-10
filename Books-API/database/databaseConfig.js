require("dotenv").config();
const { MongoClient } = require("mongodb");

function CreateDBClient() {
  const uri = process.env.MONGODB_CONNECTIONSTRING;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}

module.exports = CreateDBClient;
