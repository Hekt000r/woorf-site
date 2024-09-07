require("dotenv").config();

const express = require("express");
const app = express();
const port = 5173;
const path = require("path");
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const Groq = require("groq-sdk")

app.use(cors());
const uri = process.env.MONGO_DB_URI;

// AI setup
const groq = new Groq({apiKey: process.env.API_KEY})

// client side routing

const { createProxyMiddleware } = require("http-proxy-middleware");
const { error } = require("console");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5173", // Your backend server URL
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove base path
      },
    })
  );
};

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
app.get("/api/login", async (req, res) => {
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
app.get("/api/aiprompt", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      throw new Error(`No prompt was provided`);
    }
    console.log("everything works till part 1")
    async function getGroqChatCompletion() {
      return groq.chat.completions.create({
        messages: [{
          role: "user",
          content: prompt
        },],
        model: "llama3-8b-8192"
      })
    }
    let response = "";
    async function main() {
      const chatCompletion = await getGroqChatCompletion();
      res.json(chatCompletion.choices[0]?.message?.content || "");
      
    }
    console.log("time to execute main function")
    main()
    console.log("working till now")
    
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
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
app.get("/api/getMarkdown", async (req, res) => {
  try {
    const mdName = req.query.name
    const mdColl = myDB.collection("Markdown");
    // ignore the comments, they are for the api above

    // TODO: Remove current solution and figure out how to use findOne()
    let markdown = "";
    // Debug

    // console.log(udDOCS);

    // Secondary Solution (Temporary)
    let i = 0;
    const mdDOCS = await mdColl.find().toArray();
    while (i < mdDOCS.length) {
      console.log(mdDOCS[i].Name)
      if (mdDOCS[i].Name === mdName) {
        markdown = mdDOCS[i].Markdown;
      }
      i++;
    }
    res.json(markdown);
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
