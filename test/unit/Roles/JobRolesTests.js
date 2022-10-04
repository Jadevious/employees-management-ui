var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobdata = require("../../../data/jobdata.js");
const URL = "http://localhost:8080/api/job-roles"

const jobRoles = {
  capability: "Engineering",
  job_description: "Builds the software from requirements set by clients",
  name: "Software Engineer"
}

const failedRolesError = 'Failed to get roles';
const failedFindRolesError = 'Could not find roles'
const failedToReachAPIError = 'Unable to reach API'
const allOtherErrors = 'Error contacting API, please contact site Admin'



describe('getJobRoles', function () {

  it('should return jobs from response', async () => {
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

    expect(error.message).to.equal(failedRolesError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);

    mock.onGet(URL).reply(400);

    var error = await jobdata.getJobRoles()

    expect(error.message).to.equal(failedFindRolesError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(URL).timeout();

    var error = await jobdata.getJobRoles()

    expect(error.message).to.equal(failedToReachAPIError)
  })


})

