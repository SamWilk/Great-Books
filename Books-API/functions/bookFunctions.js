const CreateDBClient = require("../database/databaseConfig");

async function insertNewBook() {

}

async function findAuthor(AuthorName){
    const client = CreateDBClient()

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("greatbooks");
        const authorCollection = await database.collection("Author");

        const query = { AuthorName: AuthorName }

    } catch (error) {
        console.error(error);
        await client.close();
        throw error;
    }
}

async function findBookByTitle(bookTitle){
    const client = CreateDBClient();

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("greatbooks");
    const bookCollection = await database.collection("Book");

    const bookQuery = { BookTitle: bookTitle,
        AuthorID: id
     };
    const book = await bookCollection.findOne({query})

    await client.close();
    return true;
  } catch (error) {
    console.error(error);
    await client.close();
    throw error;
  }
}