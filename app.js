const express = require('express');
const mongodb = require('mongodb');
const app = express();

app.use(express.static('public')); // Serve static files from the "public" directory

const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb+srv://Api:root@api1.vb2hjwo.mongodb.net/'; // Replace with your MongoDB connection string

app.get('/data', (req, res) => {
  MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while connecting to the database');
      return console.log("connected");
    }

    const db = client.db('Api'); // Replace with your database name
    const collection = db.collection('datas'); // Replace with your collection name

    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data from the database');
      } else {
        res.json(data);
      }
      //client.close();
    });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
