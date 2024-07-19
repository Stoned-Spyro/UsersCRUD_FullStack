const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/api/v1/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
