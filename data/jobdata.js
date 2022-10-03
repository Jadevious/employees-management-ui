const axios = require('axios');

exports.getJobRoles = async () => {
   try {
      const jobResponse = await axios.get('http://localhost:8080/api/job-roles' )
      return jobResponse.data
   } catch (e) {
      if (e.response) {
         if(e.response.status == 500){
            return new Error('Failed to get roles');
         }
         else if (e.response.status == 400) {
            return new Error('Could not find roles');
         }
         console.log("There was a response")
      } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
         return new Error('Unable to reach API');
      } else {
         return new Error('Error while contacting API, please contact site Admin');
      }
      console.log(e.response.status)
      //return new Error('Error contacting API, please contact site Admin')
   }
}
 