require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

function CreateDBClient() {
    var uri;
    if(process.env.NODE_ENV != undefined && process.env.NODE_ENV == "local"){
        uri = process.env.MONGODB_COMPOSE;
    }else{
        uri = process.env.MONGODB_CONNECTIONSTRING;
    }
  const client = new MongoClient(uri, {
   serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
  });

  return client;
}

module.exports = CreateDBClient;
