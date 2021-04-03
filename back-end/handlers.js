"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
// const assert = require("assert");

console.log(process.env);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getReservations = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("db-name");

  const results = await db.collection("reservations").find();
  console.log(results);
  const reservations = {};
  results.forEach((reservation) => {
    reservations[reservation._id] = each;
  });

  if (results.length > 0) {
    res.status(200).json({
      status: 200,
      data: reservations,
    });
  } else {
    res.status(400).json({
      message: "Error",
      status: 400,
    });
  }

  client.close();
};

const bookReservation = async (req, res) => {
  const { people } = req.body;
  console.log("test");

  if (!people) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "Incomplete request. Body requires valuePeople",
    });
  }

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("db-name");
    await db.collection("reservations").insertOne(req.body);

    res.status(200).json({
      status: 200,
      message: `Your reservation was inserted.`,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      status: 500,
      message: err.message,
      data: req.body,
    });
  }
  client.close();
};

module.exports = { bookReservation, getReservations };
