const express    = require('express')
const bodyParser = require('body-parser')
const optimizer  = require('./optimizer')
const path = require('path');
// let thing = require('./thing.json')

const app  = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'client/build')));

/* Permite múltiples orígenes (react estando en un servidor diferente de express)
   para el desarrollo */
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.post('/schedule', (req, res) => {
  res.send(optimizer.alg(req.body))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server started on port ' + port))
