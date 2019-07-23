const express    = require('express')
const bodyParser = require('body-parser')
const optimizer  = require('./optimizer')
const path = require('path');
// let thing = require('./thing.json')

const app  = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/schedule', (req, res) => {
  res.send(optimizer.alg(req.body))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.port || 5000
app.listen(port, () => console.log('Server started on port '+port))