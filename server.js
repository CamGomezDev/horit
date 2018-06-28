const express    = require('express')
const bodyParser = require('body-parser')
const optimizer  = require('./optimizer')
let thing = require('./thing.json')

const port = 5000
const app  = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Esta parte es la que permite el uso de múltiples orígenes.
// También está el módulo cors para express, en caso de ser necesario.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.post('/schedule', (req, res) => {
  res.send(optimizer.alg(req.body))
})

app.listen(port, () => console.log('Server started on port '+port))