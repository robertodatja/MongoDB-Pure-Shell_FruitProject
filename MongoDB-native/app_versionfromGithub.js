https://mongodb.github.io/node-mongodb-native/4.10/

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
//Create a new MongoClient
const client = new MongoClient(uri);

// Database name
const dbName = "fruitsDataB";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('fruits');

  // the following code examples can be pasted here...

  // Insert method
  const insertResult = await collection.insertMany([
    { name: "Apple", score: 8, review: "Great" },
    { name: "Orange", score: 7, review: "Sour" },
    { name: "Banana", score: 9, review: "Great" }
  ]);
  console.log('Inserted documents =>', insertResult);

  // Find method
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
