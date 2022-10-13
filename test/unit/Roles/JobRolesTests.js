var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobdata = require("../../../data/jobdata.js");
const URL = process.env.API_URL + "/api/job-roles"
const createRoleURL = "http://localhost:8080/api/admin/new-role"
const capabilitiesURL = "http://localhost:8080/api/capabilities"
const bandsURL = "http://localhost:8080/api/bands"

const jobRoles = {
  capability: "Engineering",
  job_description: "Builds the software from requirements set by clients",
  name: "Software Engineer",
  band_name: "Apprentice",
  job_responsibilities: "Testing"
}

const newJobRole = {
  id: 1,
  name: "Software Engineer",
  description: "Updated",
  capability: "Engineering",
  specification: "example.org",
  job_responsibilities: "Build and test software",
  band_id: 1,
  job_familyID: 1
}

const capabilities = [
  {id:1, name: "Engineering"}, {id: 2, name: "Platforms"}, {id:3, name: "People"}
]

const bands = [
  {id:1, name: "Apprentice"}, {id: 2, name: "Trainee"}, {id:3, name: "Consultant"}
]

const failedRolesError = 'Failed to get roles';
const failedFindRolesError = 'Could not find roles'
const failedToReachAPIError = 'Unable to reach API'
const allOtherErrors = 'Error contacting API, please contact site Admin'
const failedToCreateRoleError = 'Failed to create new role'
const badRequestError = 'Fields are missing data or have incorrect data'

const failedCapabilitiesError = 'Failed to get capabilties';
const failedFindCapabilitiesError = 'Could not find capabilities'
const failedBandsError = 'Failed to get bands'
const failedFindBandsError = 'Could not find bands'

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

describe('getCapabilities', function () {
  it('should return capabilities from response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(200, capabilities);
    var results = await jobdata.getCapabilities();
    expect(results).to.deep.equal(capabilities)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(500);
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedCapabilitiesError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).reply(400);
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedFindCapabilitiesError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(capabilitiesURL).timeout();
    var error = await jobdata.getCapabilities()
    expect(error.message).to.equal(failedToReachAPIError)
  })
})

describe('getBands', function () {
  it('should return bands from response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(bandsURL).reply(200, bands);
    var results = await jobdata.getBands();
    expect(results).to.deep.equal(bands)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(bandsURL).reply(500);
    var error = await jobdata.getBands()
    expect(error.message).to.equal(failedBandsError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(bandsURL).reply(400);
    var error = await jobdata.getBands()
    expect(error.message).to.equal(failedFindBandsError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(bandsURL).timeout();
    var error = await jobdata.getBands()
    expect(error.message).to.equal(failedToReachAPIError)
  })
})

describe('createRole', function () {

  it('should create a new role when create role is returned', async () => {
    var mock = new MockAdapter(axios);
    mock.onPut(createRoleURL).reply(200, newJobRole);
    var results = await jobdata.createRole(newJobRole);
    expect(results).to.deep.equal(newJobRole)
  })

  it('should throw exception when 500 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(createRoleURL).reply(500);
    var error = await jobdata.createRole(newJobRole)
    expect(error.message).to.equal(failedToCreateRoleError)
  })

  it('should throw exception when 400 error returned from axios', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(createRoleURL).reply(400);
    var error = await jobdata.createRole(newJobRole)
    expect(error.message).to.equal(badRequestError)
  })

  it('should throw exception when axios has no response', async () => {
    var mock = new MockAdapter(axios);
    mock.onGet(createRoleURL).timeout();
    var error = await jobdata.createRole(newJobRole)
    expect(error.message).to.equal(failedToReachAPIError)
  })
})
