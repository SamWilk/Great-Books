const CreateDBClient = require("../database/databaseConfig");
const { hashPassword } = require("./auth/authFunctions");

async function getUser(UserName) {
  const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const userCollection = await database.collection("User");

    const query = { UserName: UserName };
    const user = await userCollection.findOne(query);

    await client.close();
    return user;
  } catch (error) {
    console.error(error);
    await client.close();
    return null;
  }
}

async function insertUser(User) {
  const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const userCollection = await database.collection("User");

    const query = {
      UserName: User.UserName,
      Email: User.Email,
      Password: await hashPassword(User.Password),
    };
    await userCollection.insertOne(query);

    await client.close();
    return true;
  } catch (error) {
    console.error(error);
    await client.close();
    if (error.code == 11000) {
      return false;
    }
    throw error;
  }
}

async function deleteUser(UserName) {
  const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const userCollection = await database.collection("User");
    const bookCollection = await database.collection("Book");
    const bookReviewCollection = await database.collection("BookReview");
    const booksReadCollection = await database.collection("BooksRead");

    const query = { UserName: UserName };

    await client.close();
    return true;
  } catch (error) {
    console.error(error);
    await client.close();
    throw error;
  }
}

module.exports = {
  getUser,
  insertUser,
  deleteUser,
};
