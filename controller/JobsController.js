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
    const jobResponse = await axios.delete('http://localhost:8080/api/delete-job/' + req.id)
    res.render('deletejob',req.body)
  } catch (e) {
    if (e.response) { // If the API returned a response (good or bad)
      if (e.response.status == 500) {
        return new Error('Failed to delete the role');
      }
      else if (e.response.status == 400) {
        return new Error('Could not find the role');
      }
    } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
      return new Error('Unable to reach API');
    } else { // All other eventualities
      return new Error('Error while contacting API, please contact site Admin');
    }
  }
 
});



module.exports = router;
