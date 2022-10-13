var express = require('express');
var router = express.Router();
var jobdata = require('../data/jobdata.js')
const JobValidator = require('../validator/JobValidator');

router.get('/', async (req, res) => {     
  res.redirect('index') 
});

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

router.get('/admin/new-role' , async (req, res) => {
  try {
    //var job = await jobdata.getJobRoleById(req.query)
    var capabilities = await jobdata.getCapabilities();
    var bands = await jobdata.getBands();
    if (capabilities instanceof Error || bands instanceof Error) {
      res.locals.errormessage = "Failed to retrieve relevant bands and capabilities";
      res.render('error', req.body)
    } else if(capabilities == null){
      res.locals.errormessage = "No capabilities found";
      res.render('error', req.body)
    } else if(bands == null) {
      res.locals.errormessage = "No bands found";
      res.render('error', req.body)
    } else {
        let data = {capabilities: capabilities, bands: bands}
        console.log(data)
      res.render('new_role.html', data)
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve information: " + e;
    res.render('error', req.body)
  }
});

router.post('/insert-role', async (req, res) => {
  //let error = JobValidator.isValidRole(req.body)
  error = null

  console.log(error)

  if (error) {
      res.locals.errormessage = error
      return res.render('new_role.html', req.body) 
  }

  try {        
      const id = await jobdata.createRole(req.body)
      if(id != null) {
        res.locals.outcome = "Role added successfully"
        res.render('jobs.html')

      }
      else {

      }
  } catch (e) {
      res.locals.errormessage = "Failed to submit form"
      res.render('new_role.html', req.body)
  }
});

module.exports = router;
