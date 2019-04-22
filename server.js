const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items.js');

const app = express();

app.use(bodyParser.json());

const db = require('./config').mongoURI;
mongoose.connect(db)
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err));

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server started on port 5000'))
