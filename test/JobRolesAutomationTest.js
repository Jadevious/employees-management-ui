const webdriver = require('selenium-webdriver');
const {By,Key,Builder} = require("selenium-webdriver");
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require ("assert");

//baseUrl where endpoints can be added depending on the test
const baseUrl = 'http://localhost:3000'

async function jobRolesAutomationTest(){

    it('should have the table headers be Job Name and Job Description', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let tableHeaderJobName = await driver.findElement(By.xpath('//*[@id="jobs_table"]/tbody/tr[1]/th[1]')).getText().then(function(value){
            return value
        })
        assert.strictEqual(tableHeaderJobName, "Job Name")

        let tableHeaderJobDescription = await driver.findElement(By.xpath('//*[@id="jobs_table"]/tbody/tr[1]/th[2]')).getText().then(function(value){
            return value
        })
        assert.strictEqual(tableHeaderJobDescription, "Job Description")

        await driver.quit();
    })

    it('should have Software Engineer as the first job listed in the table', async() => {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get(baseUrl + '/job-roles')

        let firstJobNameValue = await driver.findElement(By.id('job_name_1')).getText().then(function(value){
            return value
        });
        assert.strictEqual(firstJobNameValue, "Software Engineer")

        await driver.quit();
    })
}

jobRolesAutomationTest();
