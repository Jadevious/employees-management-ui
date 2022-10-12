const axios = require('axios');
const url = process.env.API_URL

exports.getJobRoles = async () => {
   try {
      const jobResponse = await axios.get(url + '/api/job-roles')
      return jobResponse.data
   } catch (e) {
      console.log(e);
      if (e.response) { // If the API returned a response (good or bad)
         if(e.response.status == 500){
            return new Error('Failed to get roles');
         } 
         else if (e.response.status == 400) {
            return new Error('Could not find roles');
         }
      } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
         return new Error('Unable to reach API');
      } else { // All other eventualities
         console.log("An unknown error occurred while retrieving job roles")
         return new Error('Error while contacting API, please contact site Admin');
      }
   }
}
