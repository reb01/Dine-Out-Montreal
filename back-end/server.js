"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { bookReservation } = require("./handlers");

const port = 8000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(require("./routes"));

app.get("/getReservations", getReservations);
app.post("/book-reservation", bookReservation);
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
