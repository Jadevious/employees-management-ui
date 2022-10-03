var express = require('express');
var router = express.Router();
var jobdata = require('../data/jobdata.js')

router.get('/', async (req, res) => {     
  res.render('index') 
});

router.get('/job-roles', async (req, res) => { 
  try {
    var jobs = await jobdata.getJobRoles()
    if (jobs instanceof Error) {
      res.locals.errormessage = "Failed retrieve jobs: " + jobs.message;
      res.render('error', req.body)
    } else {
      res.render('jobs.html', { jobRoles: jobs } ) 
    }
  } catch(e) {
    console.log("Failed to load roles: " + e)
    res.locals.errormessage = "Failed retrieve jobs: " + e;
    res.render('error', req.body)
  }
});






module.exports = router;