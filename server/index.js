const express = require("express");
const app = express();
const port = 5172;
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
const cors = require('cors');
app.use(cors());
const uri =
  "mongodb+srv://hektorzaimidev:8ZRltC9zSKfm9pwc@cluster0.lm0zx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false, // Temporarily set strict to false while i work on changing code to Mongoose.
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

const myDB = client.db("woorf-db1"); // Connect to db1
const myColl =  myDB.collection("Uploads");

app.get("/getDoc", (req, res) => {
  const doc = {
    title: "Test2",
    tags: ["Art and design", "Video editing", "Adobe"],
    photoURL : "http://example.com/default-image.jpg"
  }; // Create document in collection with title and tags
  const result =  myColl.insertOne(doc); // The function that actually inserts the document into the database
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  res.send(doc)
});


app.get("/getDocs", async (req, res) => {
  try {
    console.log("Fetching documents...");
    const docs = await myColl.find().toArray();
    
    res.send(docs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Internal Server Error");
  } 
}); 
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  const results = await myColl.aggregate([
    {
      $search: {
        "text": {
          "query": searchTerm,
          "path": "title",
          "fuzzy": {
            "maxEdits": 2,
            "prefixLength": 3
          }
        }
      }
    },
    {
      $limit: 10
    },
    {
      $project: {
        _id: 0,
        title: 1,
        content: 1
      }
    }
  ]).toArray();

  res.json(results);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
async function migratePhotoURLs(client) {
  const db = client.db("woorf-db1");
  const collection = db.collection("Uploads");

  try {
    await collection.updateMany(
      {}, // Match all documents
      [
        {
          $set: {
            photoURL: { $ifNull: ["$photoURL", "http://example.com/default-image.jpg"]  },
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png"
          }
        }
      ]
    );
    console.log("Migration completed.");
  } catch (error) {
    console.error(error);
  }
} // Migration function, used for migrating old documents into new ones



