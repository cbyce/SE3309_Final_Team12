const express = require('express');

const app = express();

app.use(express.static('static'));

//Hosted on port 2000
app.listen(2000);