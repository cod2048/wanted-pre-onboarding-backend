const express = require('express');
const { sequelize } = require('./models');
const companyRoutes = require('./routes/companyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const app = express();
const PORT = 3000;
app.use(express.json());

// Routes
app.use('/', companyRoutes);
app.use('/', noticeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

process.on('exit', () => {
  sequelize.close();
});
