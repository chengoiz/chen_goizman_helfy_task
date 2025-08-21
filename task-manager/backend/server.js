const express = require('express');
const cors = require('cors');
const { notFoundHandler } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/error');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/tasks', require('./routes/tasks'));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(4000, () => {
  // Minimal: no logging
});
