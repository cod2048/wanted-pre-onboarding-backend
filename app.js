const express = require('express');
const { sequelize } = require('./models');
const companyRoutes = require('./routes/companyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const userRoutes = require('./routes/userRoutes');
const applyRoutes = require('./routes/applyRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/company', companyRoutes);
app.use('/notice', noticeRoutes);
app.use('/user', userRoutes);
app.use('/apply', applyRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
