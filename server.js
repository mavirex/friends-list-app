const path = require('path');
const express = require('express');
const morgan = require('morgan');
const router = require('./api')
const db = require('./db')

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', router)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.send( `Something went wrong. ${err.message}`
    );
  });

const port = 3000;

const init = async()=> {
  try {
    await db.syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();