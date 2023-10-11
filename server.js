const app = require('./app');
const { sequelize } = require('./models');

const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('db연결 성공');
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('db연결 실패', error);
  });

process.on('exit', () => {
  sequelize.close();
});
