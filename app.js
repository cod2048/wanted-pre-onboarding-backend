const express = require('express');
const { sequelize } = require('./models');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.authenticate()
  .then(() => {
    console.log('db연결 성공');
    app.listen(PORT, () => {
      console.log(`서버 실행: http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('db연결 실패', error);
  });

process.on('exit', () => {
  sequelize.close();
});
