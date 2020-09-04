import Express from "express";
import Sequelize from "sequelize";

const sequelize = new Sequelize('postgres://localhost:5432/nedimazar');

const app = Express();



const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log("Listening on port " + port));
// app.use(Express.json());

// app.get('/', (req, res) => res.json({ message: 'Hello World' }))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// sequelize.authenticate().then(() => {

// console.log('Connection has been established successfully.');

// }).catch(err => {

// console.error('Unable to connect to the database:', err);

// });