const webdriver = require('selenium-webdriver');
const {By,Key,Builder} = require("selenium-webdriver");
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
var chai = require('chai');
const {assert} = require('chai');
const expect = chai.expect;

//URL VARIABLES
const baseUrl = 'http://localhost:3000'
const homePageUrl = 'http://localhost:3000/index'
const jobRolePageUrl = 'http://localhost:3000/job-roles'

//JOB ROLES PAGE VARIABLES
//Table Headers
const capabilityHeader = "Capability"
const nameHeader = "Job Name"
const descHeader = "Job Description"
const responsibilitesHeader = "Job Responsibilities"
//Variables for validating the contents of the first row of job-roles table 
const firstRowJobNameAndBand = "Software Engineer\n(Apprentice)"
const firstRowJobDesc = "You will work on projects where you can make a real difference to people’s lives – the lives of people you know."
const firstRowJobRespWithSpec = "As an Apprentice Software Engineer with Kainos, you will work on projects where you can make a real difference to people’s lives – the lives of people you know. extensive training to set you off on the right foot, you will quickly work as a part of a team in developing solutions within our real projects, learning all about our development languages, projects and technologies. You will be fully supported by experienced colleagues in the team as well as an experienced mentor, who will provide trai...(view specs)"
const firstRowCapability = "Engineering"
//View Specs directs user to Microsoft Login page
const viewSoftwareEngineerSpecsURL = 'https://login.microsoftonline.com/'


async function jobRolesAutomationTest(){


    describe('Home Page Tests', () => {

        it('should redirect user to Home page when they open the site', async() => {

            let driver = await new Builder().forBrowser("chrome").build();
            await driver.get(baseUrl)

            var currentURL = await driver.getCurrentUrl();

            assert.strictEqual(currentURL, homePageUrl)

            await driver.quit();
        })

        it('should have the logo present on the home page', async() => {

            let driver = await new Builder().forBrowser("chrome").build();
            await driver.get(baseUrl)

            let logoPresent = await driver.findElement(By.id('logo-img')).isDisplayed().then(function(value){
                return value;
            })

            assert.equal(logoPresent, true)

            await driver.quit();
        })


        it('should bring user to Home page when the user presses the Home button in nav bar', async() => {

            let driver = await new Builder().forBrowser("chrome").build();
            //start on a different page
            await driver.get(jobRolePageUrl)

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
    })
    
    describe('Job Roles Page', () => {

        it('should bring user to the Job Roles page when Job Roles button in nav bar is clicked', async() => {

            let driver = await new Builder().forBrowser("chrome").build();
            await driver.get(baseUrl)

            await driver.findElement(By.id('navbar-job-roles')).click();

            var currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, jobRolePageUrl)

            await driver.quit();
        })

        it('should have the table headers be Capability, Job Name, Job Description and Job Responsibilites', async() => {

            let driver = await new Builder().forBrowser("chrome").build();
            await driver.get(jobRolePageUrl)

            let tableHeaderCapability = await driver.findElement(By.id('capability_header')).getText().then(function(value){
                return value
            })
            assert.strictEqual(tableHeaderCapability, capabilityHeader)

            let tableHeaderJobName = await driver.findElement(By.id('job_name_header')).getText().then(function(value){
                return value
            })
            assert.strictEqual(tableHeaderJobName, nameHeader)

            let tableHeaderJobDescription = await driver.findElement(By.id('job_description_header')).getText().then(function(value){
                return value
            })
            assert.strictEqual(tableHeaderJobDescription, descHeader)

            let tableHeaderJobResponsibilities = await driver.findElement(By.id('job_responsibilities_header')).getText().then(function(value){
                return value
            })
            assert.strictEqual(tableHeaderJobResponsibilities, responsibilitesHeader)

            await driver.quit();
        })


        describe('these tests assume that Software Engineer will always be the first job listed in table', () => {

            it('should have the logo present on the job-roles page', async() => {

                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)
    
                let logoPresent = await driver.findElement(By.id('logo-img')).isDisplayed().then(function(value){
                    return value;
                })

                assert.equal(logoPresent, true)
    
                await driver.quit();
            })
    

            it('should have Software Engineer as the first job listed in the table with assciated band', async() => {

                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)

                let firstJobNameAndBandValue = await driver.findElement(By.id('job_name_1')).getText().then(function(value){
                    return value
                })

                assert.strictEqual(firstJobNameAndBandValue, firstRowJobNameAndBand)

                await driver.quit();
            })

            it('should have the correct Job Description associated with the Software Engineer row in the job-roles table', async() => {

                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)

                let firstJobDescriptionValue = await driver.findElement(By.id('job_description_1')).getText().then(function(value){
                    return value
                })

                expect(firstJobDescriptionValue).to.contain(firstRowJobDesc)

                await driver.quit();
            })

            it('should have the correct Job Responsibilities including specification associated with the Software Engineer row in the job-roles table', async() => {
                
                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)

                let firstJobResonsibilitiesWithSpecValue = await driver.findElement(By.id('job_responsibilities_1')).getText().then(function(value){
                    return value
                })
                assert.strictEqual(firstJobResonsibilitiesWithSpecValue, firstRowJobRespWithSpec)

                await driver.quit();
            })

            it('should have the correct Capability associated with the Software Engineer row in the job-roles table', async() => {

                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)

                let firstCapabilitiesValue = await driver.findElement(By.id('job_capability_1')).getText().then(function(value){
                    return value
                })
                assert.strictEqual(firstCapabilitiesValue, firstRowCapability)

                await driver.quit();
            })

            it('should bring user to Software Engineer specification when the link in responsibilites is clicked', async() => {

                let driver = await new Builder().forBrowser("chrome").build();
                await driver.get(jobRolePageUrl)

                await driver.findElement(By.id('job_specs_1')).click();
                var currentURL = await driver.getCurrentUrl();
                
                expect(currentURL).to.contains(viewSoftwareEngineerSpecsURL)

                await driver.quit()
            })
        })
    })
}   

jobRolesAutomationTest();
