const axios = require('axios');
const url = process.env.API_URL

exports.getJobRoles = async () => {
   try {
      const jobResponse = await axios.get(url + '/api/job-roles')
      return jobResponse.data
   } catch (e) {
      if (e.response) { // If the API returned a response (good or bad)
         if (e.response.status == 500) {
            return new Error('Failed to get roles');
         } 
         else if (e.response.status == 400) {
            return new Error('Could not find roles');
         }
      } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
         return new Error('Unable to reach API');
      } else { // All other eventualities
         return new Error('Error while contacting API, please contact site Admin');
      }
   }
}

exports.getCapabilities = async () => {
   try {
      const jobResponse = await axios.get('http://localhost:8080/api/capabilities')
      return jobResponse.data
   } catch (e) {
      if (e.response) { // If the API returned a response (good or bad)
         if (e.response.status == 500) {
            return new Error('Failed to get capabilties');
         }
         else if (e.response.status == 400) {
            return new Error('Could not find capabilities');
         }
      } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
         return new Error('Unable to reach API');
      } else { // All other eventualities
         return new Error('Error while contacting API, please contact site Admin');
      }
   }
}

   exports.getBands = async () => {
      try {
         const jobResponse = await axios.get('http://localhost:8080/api/bands')
         return jobResponse.data
      } catch (e) {
         if (e.response) { // If the API returned a response (good or bad)
            if (e.response.status == 500) {
               return new Error('Failed to get bands');
            }
            else if (e.response.status == 400) {
               return new Error('Could not find bands');
            }
         } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
            return new Error('Unable to reach API');
         } else { // All other eventualities
            return new Error('Error while contacting API, please contact site Admin');
         }
      }
   }

      exports.getJobRoleById = async (req) => {
         try {
            const jobResponse = await axios.get('http://localhost:8080/api/job-roles/' + req.id)
            return jobResponse.data
         } catch (e) {
            if (e.response) { // If the API returned a response (good or bad)
               if (e.response.status == 500) {
                  return new Error('Failed to get the role');
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
      }

      exports.editJobRole = async (updates) => {
         try {
            const jobResponse = await axios.put('http://localhost:8080/api/admin/edit-role', updates)
            return jobResponse.data
         } catch (e) {
            if (e.response) { // If the API returned a response (good or bad)
               if (e.response.status == 500) {
                  return new Error('Failed to update role');
               }
               else if (e.response.status == 400) {
                  return new Error('Could not find the role to update');
               }
            } else if (e.code = 'ECONNREFUSED') { // Only true if API response not present
               return new Error('Unable to reach API');
            } else { // All other eventualities
               return new Error('Error while contacting API, please contact site Admin');
            }
         }
      }

