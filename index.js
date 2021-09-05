require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const countryRoutes = require("./routes/country");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", countryRoutes);

app.listen( process.env.PORT || 8080, () => {
  console.log(`app is running at 8080`);
});
