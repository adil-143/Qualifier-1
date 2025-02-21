const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/process", (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const alphabets = data.filter((item) => /^[A-Za-z]+$/.test(item));
  const numbers = data.filter((item) => /^[0-9]+$/.test(item));
  const highestAlphabet = alphabets.length ? alphabets.sort().reverse()[0] : null;

  res.json({ alphabets, numbers, highestAlphabet });
});

app.listen(5000, () => console.log("Server running on port 5000"));
