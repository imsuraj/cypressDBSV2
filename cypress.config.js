const { defineConfig } = require("cypress");

module.exports = defineConfig({

  viewportWidth: 2048,
  viewportHeight: 1080,

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
    "watchForFileChanges": true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      const username = process.env.ROSIA_USERNAME
      const password = process.env.ROSIA_PASSWORD
      const baseUrl = process.env.ROSIA_URL
      // if(!password) {
      //   throw new Error('Missing PASSWORD environment variable')
      // }
      config.env = { username, password,baseUrl }
      return config

    },
    excludeSpecPattern: ['**/cypress/e2e/1-getting-started', '**/cypress/e2e/2-advanced-examples'],
    spectPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}	',
  },

  env: {
    "baseUrl": 'https://qa.dbs.rosia.one',
    "email": "admin@dbs.rosia.one",
    "password": "Evolve@123"
  }
});
