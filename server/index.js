require("dotenv").config();

const express = require("express");
const app = express();
const port = 5172;
const path = require("path");
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require("mongodb");
app.use(cors());
const uri = process.env.MONGO_DB_URI;

app.use(express.static(path.join(__dirname, "../client/dist")));

// client side routing

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5172", // Your backend server URL
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove base path
      },
    })
  );
};

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.get("/altsearch", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/downloadpage/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use((req, res, next) => {
  if (req.path.includes(".css")) {
    res.set("Content-Type", "text/css");
  }
  next();
});
app.use(cors());

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
const myColl = myDB.collection("Uploads");

app.get("/api/getDoc", (req, res) => {
  const doc = {
    title: "Test2",
    tags: ["Art and design", "Video editing", "Adobe"],
    photoURL: "http://example.com/default-image.jpg",
  }; // Create document in collection with title and tags
  const result = myColl.insertOne(doc); // The function that actually inserts the document into the database
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  res.send(doc);
});

app.get("/api/getDocs", async (req, res) => {
  try {
    console.log("Fetching documents...");
    const docs = await myColl.find().toArray();

    res.send(docs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.term;
  console.warn("NORMAL SEARCH!!!!!!!!!!!!!!!");
  const results = await myColl
    .aggregate([
      {
        $search: {
          text: {
            query: searchTerm,
            path: ["title", "tags"],
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          photoURL: 1,
          tags: 1,
          downloadURL: 1,
        },
      },
    ])
    .toArray();

  res.json(results);
});
app.get("/api/altsearch", async (req, res) => {
  const searchTerm = req.query.term;
  console.warn("NORMAL SEARCH!!!!!!!!!!!!!!!");
  const results = await myColl
    .aggregate([
      {
        $search: {
          text: {
            query: searchTerm,
            path: ["alternativeTo"],
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          photoURL: 1,
          tags: 1,
          downloadURL: 1,
          flashDescription: 1,
        },
      },
    ])
    .toArray();

  console.log(results);
  res.json(results);
});
app.get("/login", async (req, res) => {
  // Temporary Authentication, use third party for this later on

  const enteredPassword = req.query.password;
  const password = process.env.CLIENT_PASSWORD;
  if (enteredPassword.toLowerCase() == password.toLowerCase()) {
    res.status(200).json({ message: "Successfully authenticated" });
    console.log("your'e authenticated lol");
  } else {
    res
      .status(401)
      .json({ message: "Incorrect password, failed to authenticate" });
    console.log("idiot");
    console.log(password);
    console.log(enteredPassword);
  }
});
app.get("/api/getCategories", async (req, res) => {
  try {
    const udColl = myDB.collection("Unordered Data");
    // TODO: Remove current solution and figure out how to use findOne()
    let categories = [];
    // Debug

    // console.log(udDOCS);

    // Secondary Solution (Temporary)
    let i = 0;
    const udDOCS = await udColl.find().toArray();
    while (i < udDOCS.length) {
      console.log(udDOCS[i].DataName);
      if (udDOCS[i].DataName === "Categories") {
        categories = udDOCS[i].Data;
      }
      i++;
    }
    res.json(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/document/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const document = await myColl.findOne({ _id: new ObjectId(id) });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
async function migrateDocuments(client) {
  const db = client.db("woorf-db1");
  const collection = db.collection("Uploads");

  try {
    await collection.updateMany(
      {}, // Match all documents
      [
        {
          $set: {
            category: {
              $ifNull: ["$category", "None"],
            },
          },
        },
      ]
    );
    console.log("Migration completed.");
  } catch (error) {
    console.error(error);
  }
} // Migration function, used for migrating old documents into new ones
