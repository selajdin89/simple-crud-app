const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello CRUD');
});

app.use(bodyParser.json());

mongoose.set('strictQuery', true);
const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:selajdin1989@todosapi.okovrwd.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('Connected to mongoDB!');
  } catch (error) {
    console.log(error);
  }
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
