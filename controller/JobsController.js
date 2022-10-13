var express = require('express');
var router = express.Router();
var jobdata = require('../data/jobdata.js')
var userdata = require('../data/userdata.js')
var session = require('express-session');
var bodyParser = require('body-parser');
const usersR = []
const jwt = require("jsonwebtoken");
const env = require('dotenv').config();

const bcrypt = require('bcrypt')

//router.get('/', async (req, res) => {     
//  res.redirect('index') 
//});

router.get('/job-roles', async (req, res) => {
  try {
    var jobs = await jobdata.getJobRoles()
    if (jobs instanceof Error) {
      res.locals.errormessage = "Failed to retrieve jobs";
      res.render('error', req.body)
    } else if(jobs == null){
      res.locals.errormessage = "No jobs found";
      res.render('error', req.body)
    } else {
      jobs.forEach(job => {
        if (job.responsibilities.length = 500) {
          job.responsibilities = job.responsibilities + "..."
        }
      });
      res.render('jobs.html', { jobRoles: jobs })
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve jobs: " + e;
    res.render('error', req.body)
  }
});

//router.get('/login', async (req, res) => {
//  var result = await userdata.getUsers()
//  res.render('view-highest-earning-employee', {
//  users: result
//   })});


// router.use(bodyParser.urlencoded({extended : true}));
// router.use(bodyParser.json());

// router.get('/', async (req, res) => {
// 	res.sendFile(path.join(__dirname + '/views/login.html'));
// });

// router.post('/auth', async (req, res) => {
// 	var username = req.body.username;
// 	var password = req.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				req.session.loggedin = true;
// 				req.session.username = username;
// 				res.redirect('/index');
// 			} else {
// 				res.send('Incorrect Username and/or Password!');
// 			}			
// 			res.end();
// 		});
// 	} else {
// 		res.send('Please enter Username and Password!');
// 		res.end();
// 	}
// });

// router.get('/index', async (req, res) => {
// 	if (req.session.loggedin) {
// 		res.send('Welcome back, ' + req.session.username + '!');
// 	} else {
// 		res.send('Please login to view this page!');
// 	}
// 	res.end();
// });

router.get('/', async (req, res) => {     
  res.redirect('login') 
});

router.get('/login', async (req, res) => {
  try {
    var users = await userdata.getUsers()
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve users: " + e;
    res.render('error', req.body)
  }
  res.render('login.html')
  
});

router.post('/login', async (req, res) => {
  var users = await userdata.getUsers()
  const user = users.find(user => user.username === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password, (err, result))) {
      //res.send('Success')
      res.redirect('/index');
    } else {
      res.send('Not Allowed')
    }
  } catch {
   res.status(500).send()
  }
})


module.exports = router;
