const CreateDBClient = require("../database/databaseConfig");
const { appendTitleToUrl } = require("./stringManiuplation");

async function insertNewBook() {}

async function findAuthor(AuthorName) {
  const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const authorCollection = await database.collection("Author");

    const query = { AuthorName: AuthorName };
  } catch (error) {
    console.error(error);
    await client.close();
    throw error;
  }
}

async function findBookByTitle(bookTitle) {
  const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const bookCollection = await database.collection("Book");

    const bookQuery = { BookTitle: bookTitle, AuthorID: id };
    const book = await bookCollection.findOne({ query });

    await client.close();
    return true;
  } catch (error) {
    console.error(error);
    await client.close();
    throw error;
  }
}

async function getUsersBooks(userName) {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const bookCollection = await database.collection("UserBooks");

    const bookQuery = { UserName: bookTitle, AuthorID: id };
    const book = await bookCollection.findOne({ query });

    await client.close();
    return true;
  } catch (error) {
    console.error(error);
    await client.close();
    throw error;
  }
}

async function getBookFromOpenLibraryByTitle({
  bookTitle,
  page,
  limit,
  offset,
}) {
  if (!bookTitle) {
    return undefined;
  }
  const pasredTitle = bookTitle.split(" ").join("+");
  const Url = appendTitleToUrl(pasredTitle, page, limit, offset);

  try {
    const response = await fetch(Url);
    const body = await response.json();
    return body;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBookFromOpenLibraryByTitle,
};
