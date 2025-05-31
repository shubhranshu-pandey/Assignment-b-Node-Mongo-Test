const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/peopleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});