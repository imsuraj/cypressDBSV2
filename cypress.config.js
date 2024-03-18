const { defineConfig } = require("cypress");
const getspecFiles = require("cypress-gitlab-parallel-runner")

module.exports = defineConfig({

  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 120000,
  video: true,
  // retries: {openMode:2, runMode: 1},

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports",
    reportFilename: "[status]_[datetime]-[name]-report",
    overwrite: false,
    html: true,
    json: true,
    reportPageTitle: 'ROSIA DBS Automation Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    code: true,
    autoOpen: false
   

  },


  e2e: {
    baseUrl: 'https://qa.dbs.rosia.one',
    "watchForFileChanges": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      getspecFiles("./cypress/e2e/tests",true)
      require('cypress-mochawesome-reporter/plugin')(on);
      const username = process.env.ROSIA_USERNAME
      const password = process.env.ROSIA_PASSWORD
      // const baseUrl = process.env.ROSIA_URL
      //// if(!password) {
      //   throw new Error('Missing PASSWORD environment variable')
      // }
      config.env = { username, password }
      return config

    },
    excludeSpecPattern: ['**/cypress/e2e/1-getting-started', '**/cypress/e2e/2-advanced-examples'],
    spectPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}	',
  },

  env: {
    
    "email": "admin@dbs.rosia.one",
    "password": "Evolve@123"
  }
});
