const express = require('express');
const logger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

app.use(notFoundHandler);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
