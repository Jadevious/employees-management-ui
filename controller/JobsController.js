var express = require('express');
var router = express.Router();
var jobdata = require('../jobdata.js')

router.get('/', async (req, res) => {     
  res.render('index') 
});




  router.get('/job-roles', async (req, res) => { 
    console.log(await jobdata.getJobRoles())
    res.render('jobs.html', { jobRoles: await jobdata.getJobRoles() } ) 
    console.log("hello");
});






module.exports = router;