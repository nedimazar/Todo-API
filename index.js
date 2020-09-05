Express = require("express");
const {
  Sequelize,
  DataTypes,
  Model
} = require("sequelize");

const sequelize = new Sequelize('postgres://localhost:5432/todoapi');

const app = Express();

const port = 3000;

app.use(Express.json());

app.get('/', (req, res) => res.json({
  message: 'Hello, World!'
}))

app.get('/wow', (req, res) => res.json({
  message: 'Wow, World!'
}))

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`))

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

class todo extends Model {}

todo.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'todo' // We need to choose the model name
});

todo.sync({
  force: true
});