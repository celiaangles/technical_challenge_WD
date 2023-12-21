const express = require("express");
const app = express();
const hbs = require("hbs");
const phones = require("./data/phones.json");
const cors = require("cors");
app.use(cors());
app.use("/images", express.static("./assets/images"));

// app.use("/images", express.static(__dirname + "/images"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/phones", (req, res) => {
  res.json(phones);
});

app.get("/phones/:id", (req, res) => {
  const phoneId = parseInt(req.params.id);
  const phone = phones.find((phone) => phone.id === phoneId);

  if (!phone) {
    res.status(404).json({ error: "Phone not found" });
  } else {
    res.json(phone);
  }
});

app.listen(3000, () => console.log("App listening on port 3000!"));
