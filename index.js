Express = require("express");
const {
  Sequelize,
  DataTypes,
  Model
} = require("sequelize");

const sequelize = new Sequelize('postgres://localhost:5433/todoapi');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


const app = Express();

const port = 3000;

app.use(Express.json());

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`))

class todo extends Model {}

todo.init({
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
  //force: true
});

app.get('/', (req, res) => res.json({
  message: 'Hello, World!!'
}));

// This lets us query the database by the id of a TODO item.
app.get("/api/todos/:todoId", (req, res) => {
  let reqId = req.params.todoId;
  todo.findOne({where: {id: reqId}}).then((todo) => {
    res.json(todo);
  });
});


