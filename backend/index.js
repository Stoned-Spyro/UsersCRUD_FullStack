const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});