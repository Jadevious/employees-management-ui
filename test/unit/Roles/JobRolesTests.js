var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const jobdata = require("../../../data/jobdata.js");
const URL = "http://localhost:8080/api/job-roles"

const jobRoles = {
  job_description: "Builds the software from requirements set by clients",
  name: "Software Engineer"
    
}


    describe('getJobRoles', function () {

      it('should return employees from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [jobRoles];

        mock.onGet(URL).reply(200, data);

        var results = await jobdata.getJobRoles();

        expect(results[0]).to.deep.equal(jobRoles)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(URL).reply(500);

        var error = await jobdata.getJobRoles()
        
        expect(error.message).to.equal('Failed to get roles')
      })

      it('should throw exception when 400 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(URL).reply(400);

        var error = await jobdata.getJobRoles()
        
        expect(error.message).to.equal('Could not find roles')
      })
    })