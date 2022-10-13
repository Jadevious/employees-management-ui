# Kainos Recruitment UI node.js repo
This is the repository containing the node.js project that runs the Kainos Recruitment application's UI.

---
## Requirements
For development and testing, you will need Node.js installed.

### Installing Node
You can find more information about the installation for specific operating systems on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version

    $ npm --version

### Building and running the project
There are two ways to approach project setup and execution - Either directly (as follows) or building a docker image.

#### Building and running the project in the terminal
Before anything, you'll want to set an environmental variable for the URL of your corresponding API node.

    $ export API_URL=<your api url>

You can build this node.js application simply by running the following command.

    $ npm install

Once all of the dependencies have finished installing, you can start the application by running the following command.

    $ npm start

#### Building and running the project in a docker container
The project has been pre-prepared for containerisation with an included dockerfile.

First, you should build the latest version of your project in docker, citing your API's url
    
    $ docker build -t kainos-recruitment-ui --build-arg API_URL=<your api url> .

Following the build, you should be able to run the docker image instantly, in this case exposing the 3000 port for the project
    
    $ docker run -p 3000:3000 kainos-recruitment-ui

### Testing
You can run the unit and integration tests contained in the project's test folder by running the following command.
    
    $ npm test

You can run the application's automation tests by running the following command.

    $ npm test ./test/JobRolesAutomationTest.js
