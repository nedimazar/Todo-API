Express = require("express");
const {
  Sequelize,
  DataTypes,
  Model
} = require("sequelize");

const bodyParser = require("body-parser");

const sequelize = new Sequelize('postgres://localhost:5432/todoapi');

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


const app = Express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(Express.json());

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`))

class todo extends Model {}

todo.init({
  // @NED - it's best to just allow sequelize to handle these fields automatically for you
  // id: {
  //   type: DataTypes.BIGINT,
  //   primaryKey: true,
  //   allowNull: false
  // },
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

app.get('/', (req, res) => res.json({
  message: 'Hello, World!!'
}));

// This lets us query the database by the id of a TODO item.
app.get("/api/todos/:todoId", (req, res) => {
  console.log(req)
  let reqId = req.params.todoId;
  todo.findOne({where: {id: reqId}}).then((todo) => {
    res.json(todo);
  });
});

// This is broken, message and id are always null
app.post('/api/todos', (req, res) => { // @NED - assuming you want it at this route
  console.log("\n\n\n\n" + (req.body) + "\n\n\n\n")
  const todoItem = {
    isComplete: false,
    message: req.body.message,
    // id: req.body.id, @NED -  don't need to set the ID here, 
    // sequelize will do it for you (unless you're trying to add the todolist ID?)
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


