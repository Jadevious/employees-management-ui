const axios = require('axios');

exports.getJobRoles = async () => {
    try {
       const jobResponse = await axios.get('http://localhost:8080/api/jobs' )
       return jobResponse.data
    } catch (e) {
       return new Error('Could not get roles')
    }
 }