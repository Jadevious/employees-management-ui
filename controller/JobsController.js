var express = require('express');
const { render } = require('nunjucks');
const { Capabilities } = require('selenium-webdriver');
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
  renderNewRole(req, res)
});

router.post('/insert-role', async (req, res) => {
  try {        
      const id = await jobdata.createRole(req.body)
      if(id != null) {
        res.locals.outcome = "Role added successfully"
        renderNewRole(req, res)
      }
      else {
        res.locals.outcome = "Role can not be added at this time"
        renderNewRole(req, res)
      }
  } catch (e) {
      res.locals.errormessage = "Failed to submit form"
      res.render('new_role', req.body)
  }
});

async function renderNewRole (req, res) {
  try {
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
}

router.post('/role-updated' , async (req, res) => {
  try {
    var edit_job = await jobdata.editJobRole(req.body)
    if (edit_job instanceof Error) {
      res.locals.errormessage = "Failed to update job";
      res.render('error', req.body)
    } else if(edit_job == null){
      res.locals.errormessage = "No job to update found";
      res.render('error', req.body)
    } else {
      res.locals.statusmessage = "Updated role successfully!";
      res.render('edit_role.html')
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve job to update: " + e;
    res.render('error', req.body)
  }
})

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
      let data = {edit_data : {job}, capabilities: capability, bands: bands}
      res.render('edit_role.html', data )
    }
  } catch (e) {
    res.locals.errormessage = "Failed to retrieve job: " + e;
    res.render('error', req.body)
  }

});

module.exports = router;

