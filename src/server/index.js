const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use('/game',morgan('tiny'));

const myCompression = compression();

app.use(myCompression);

app.use(express.json())
app.use(express.urlencoded())

app.use((req,res, next) => {
  next();
})

const publicRoot = __dirname + '/public'

app.use('/static', express.static(publicRoot))

app.use(routes)

app.listen(80, (err) => {
  if(err){
    console.log(err.stack);
    process.exit(255);
  }else{
    console.log('Listening on port 80');
  }
})
