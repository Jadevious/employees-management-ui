var createError = require('http-errors');
var express = require('express');
const nunjucks = require('nunjucks')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var userdata = require('/Users/mieabiyeselema/teamC_groupProject/kainos-recruitment-ui/data/userdata.js')
var users = userdata.getUsers()
var session = require('express-session');
var bodyParser = require('body-parser');

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


const users1 = []

const bcrypt = require('bcrypt')

//app.get('/users', (req, res) => {
//  res.json(users1)
//})

//app.post('/users', async (req, res) => {
//  try {
//    const hashedPassword = await bcrypt.hash(req.body.password, 10)
//    const user = { name: req.body.name, password: hashedPassword }
//    users.push(user)
//    res.status(201).send()
//  } catch {
//    res.status(500).send()
//  }
//})

//app.post('/login', async (req, res) => {
//  const user = Array.from(users).find(user => user.username === req.body.username)
//  if (user == null) {
//     return res.status(400).send('Cannot find user')
//  }
//  try {
//    if(await bcrypt.compare(req.body.password, user.password)) {
//      res.send('Success')
//    } else {
//      res.send('Not Allowed')
//    }
//  } catch {
//    res.status(500).send()
//  }
//})




// Importing js files from directory
const routes = require('./controller/JobsController.js')
const utils = require('./lib/utils.js')
const config = require('./config.js')

var useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData

var nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app,
  watch: false // We are now setting this to `false` (it's by default false anyway) as having it set to `true` for production was making the tests hang
}

var nunjucksAppEnv = nunjucks.configure("views", nunjucksConfig)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')))

// Adding application-wide variables
app.locals.asset_path = '/public/'
app.locals.useAutoStoreData = (useAutoStoreData === 'true')

// Allows cached data to be removed (Stored data not yet implemented)
app.post('/clear-data', function (req, res) {
  req.session.data = {}
})

// Checking router file validity and setting it
if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the Prototype Kit documentation for writing routes.')
  routes.bind(app)
} else {
  app.use('/', routes)
}

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

app.get(/^([^.]+)$/, function (req, res, next) {
  utils.matchRoutes(req, res, next)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;
