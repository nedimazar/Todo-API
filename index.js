Express = require("express");
const {
  Sequelize,
  DataTypes,
  Model
} = require("sequelize");

const bodyParser = require("body-parser");

const sequelize = new Sequelize('postgres://localhost:5433/todoapi');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


const app = Express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(Express.json());

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`))

class todo extends Model {}

todo.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
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


// This lets us query the database by the id of a TODO item.
app.get("/api/todos/:todoId", (req, res) => {
  console.log(req)
  let reqId = req.params.todoId;
  todo.findOne({
    where: {
      id: reqId
    }
  }).then((todo) => {
    res.json(todo);
  });
});

//This lets us get all the TODOS
app.get('/api/todos', function (req, res) {
  todo.findAll().then(todolist => res.json(todolist))
});

//This lets us add a new item to the TODO list
app.post('/api/todos', (req, res) => { // @NED - assuming you want it at this route
  console.log("\n\n\n\n" + (req.body.message) + "\n\n\n\n")
  const todoItem = {
    isComplete: false,
    message: req.body.message,
  };

  todo.create(todoItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    })
});

//This lets us delete a TODO item by id
app.delete('/api/todos/:id', (req, res, next) => {
  todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({
    status: 'ok'
  }))
});

app.put('/api/todos/:id', (req, res) => {
  console.log(req.body.isComplete);
  todo.findByPk(req.params.id).then(item => item.update({
    isComplete: req.body.isComplete
  }).then(item => res.json(item)))
});