const axios = require('axios');

exports.getJobRoles = async () => {
    try {
       const jobResponse = await axios.get('http://localhost:8080/api/job-roles' )
       return jobResponse.data
    } catch (e) {
      if(e.response.status == 500){
         return new Error('Failed to get roles')
      }
      else if (e.response.status == 400) {
         return new Error ('Could not find roles')
      }
      console.log(e.response.status)
       
    }
 }