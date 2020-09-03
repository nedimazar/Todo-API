const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

const app = express()

const port = 3000

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


sequelize.authenticate().then(() => {

console.log('Connection has been established successfully.');

}).catch(err => {

console.error('Unable to connect to the database:', err);

});