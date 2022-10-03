var express = require('express');
var router = express.Router();
var jobdata = require('../data/jobdata.js')

router.get('/', async (req, res) => {     
  res.render('index') 
});

router.get('/job-roles', async (req, res) => { 
  try {
     var jobs = await jobdata.getJobRoles()
    console.log(jobs)
    if (jobs instanceof Error) {
      res.locals.errormessage = "Failed retrieve jobs: " + jobs.message;
      res.render('error', req.body)
    }else if(jobs == null){
      res.locals.errormessage = "No jobs found";
      res.render('error', req.body)
    }
     else {
      res.render('jobs.html', { jobRoles: jobs } ) 
    }
  } catch(e) {
    console.log("Failed to load roles: " + e)
    res.locals.errormessage = "Failed to retrieve jobs: " + e;
    res.render('error', req.body)
  }
});


module.exports = router;