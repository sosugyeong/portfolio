'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname,''));

app.get('', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.listen(port, () => {
    console.log('서버가 실행됩니다. http://localhost:${port}');
});



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sugyeong247:jellycat123@one.pdb62.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);