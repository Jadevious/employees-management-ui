var express = require('express');
var router = express.Router();
var jobdata = require('../data/jobdata.js')

router.get('/', async (req, res) => {     
  res.redirect('index') 
});
router.get('/admin/index', async (req, res) => {     
  res.render('admin') 
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


router.get('/delete-role', async (req, res) => {
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
      res.render('deletejob.html', { jobRoles: jobs })
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve jobs: " + e;
    res.render('error', req.body)
  }
});



router.delete('/delete-job/:id', async (req, res) => {
  try {
    var jobs = await jobdata.deleteJobRole(req.params.id)
    if (jobs instanceof Error) {
      console.log('no response from deleteJobRole')
    } else {
      res.render('jobs', req.body)
    }

  } catch (e) {
    console.log('no response from deleteJobRole')
  }
});


router.get('/edit-role/*' , async (req, res) => {
  try {
    var job = await jobdata.getJobRoleById(req.query)
    var capability = await jobdata.getCapabilities();
    var bands = await jobdata.getBands();
    if (job instanceof Error) {
      res.locals.errormessage = "Failed to retrieve job";
      res.render('error', req.body)
    } else if(job == null){
      res.locals.errormessage = "No job found";
      res.render('error', req.body)
    } else {
        if (job.responsibilities.length = 500) {
          job.responsibilities = job.responsibilities + "..."
        }
        let data = {edit_data : {job}, capabilities: capability, bands: bands}
        console.log(data)
      res.render('edit_role.html', data )
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve jobs: " + e;
    res.render('error', req.body)
  }

});



module.exports = router;
