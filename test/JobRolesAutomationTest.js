const webdriver = require('selenium-webdriver');
const {By,Key,Builder} = require("selenium-webdriver");
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require ("assert");

//URL VARIABLES
const baseUrl = 'http://localhost:3000'
const homePageUrl = 'http://localhost:3000/index'
const jobRolePageUrl = 'http://localhost:3000/job-roles'

//JOB ROLES PAGE VARIABLES
//Table Headers
const nameHeader = "Job Name"
const descHeader = "Job Description"
const responsibilitesHeader = 'Job Responsibilities'
//Variables for validating the contents of the first row of job-roles table 
const firstRowJobName = "Software Engineer"
const firstRowJobDesc = "You will work on projects where you can make a real difference to people’s lives – the lives of people you know. extensive training to set you off on the right foot, you will quickly work as a part of a team in developing solutions within our real projects, learning all about our development languages, projects and technologies. You will be fully supported by experienced colleagues in the team as well as an experienced mentor, who will provide training and mentoring throughout your studies."
const firstRowJobResp = "As an Apprentice Software Engineer with Kainos, you will work on projects where you can make a real difference to people’s lives – the lives of people you know. extensive training to set you off on the right foot, you will quickly work as a part of a team in developing solutions within our real projects, learning all about our development languages, projects and technologies. You will be fully supported by experienced colleagues in the team as well as an experienced mentor, who will provide trai..."


async function jobRolesAutomationTest(){

    // Home Page Tests

    it('should redirect user to home page when they open the site', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl)

        var currentURL = await driver.getCurrentUrl();

        assert.strictEqual(currentURL, homePageUrl)

        await driver.quit();
    })


    it('should bring user to home page when the user presses the home button in nav bar', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        //start on a different page
        await driver.get(baseUrl + '/job-roles')

        await driver.findElement(By.id('navbar-home')).click();

        var currentURL = await driver.getCurrentUrl();
        assert.strictEqual(currentURL, homePageUrl)

        await driver.quit();
    })


    it('should bring user to Job Roles page when user presses View More Roles button on homepage', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl)

        await driver.findElement(By.id('view-roles-button')).click();

        var currentURL = await driver.getCurrentUrl();
        assert.strictEqual(currentURL, jobRolePageUrl)

        await driver.quit();
    })

    // Job Roles Page Tests

    it('should bring user to the Job Roles page when job roles button in nav bar is clicked', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl)

        await driver.findElement(By.id('navbar-job-roles')).click();

        var currentURL = await driver.getCurrentUrl();
        assert.strictEqual(currentURL, jobRolePageUrl)

        await driver.quit();
    })

    it('should have the table headers be Job Name, Job Description and Job Responsibilites', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let tableHeaderJobName = await driver.findElement(By.xpath('//*[@id="jobs_table"]/tbody/tr[1]/th[1]')).getText().then(function(value){
            return value
        })
        assert.strictEqual(tableHeaderJobName, nameHeader)

        let tableHeaderJobDescription = await driver.findElement(By.xpath('//*[@id="jobs_table"]/tbody/tr[1]/th[2]')).getText().then(function(value){
            return value
        })
        assert.strictEqual(tableHeaderJobDescription, descHeader)

        let tableHeaderJobResponsibilities = await driver.findElement(By.xpath('//*[@id="jobs_table"]/tbody/tr[1]/th[3]')).getText().then(function(value){
            return value
        })
        assert.strictEqual(tableHeaderJobResponsibilities, responsibilitesHeader)

        await driver.quit();
    })


    //The following tests are assuming that Software Engineer will always be the first job listed in the table

    it('should have Software Engineer as the first job listed in the table', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let firstJobNameValue = await driver.findElement(By.id('job_name_1')).getText().then(function(value){
            return value
        })
        assert.strictEqual(firstJobNameValue, firstRowJobName)

        await driver.quit();
    })

    it('should have the correct Job Description associated with the Software Engineer row in the job-roles table', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let firstJobDescriptionValue = await driver.findElement(By.id('job_description_1')).getText().then(function(value){
            return value
        })
        assert.strictEqual(firstJobDescriptionValue, firstRowJobDesc)

        await driver.quit();
    })

    it('should have the correct Job Responsibilities associated with the Software Engineer row in the job-roles table', async() => {
        
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let firstJobResonsibilitiesValue = await driver.findElement(By.id('job_responsibilities_1')).getText().then(function(value){
            return value
        })
        assert.strictEqual(firstJobResonsibilitiesValue, firstRowJobResp)

        await driver.quit();
    })

    //end of Software Engineer tests

}

jobRolesAutomationTest();
