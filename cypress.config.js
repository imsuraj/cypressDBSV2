// import necessary libraries
const { defineConfig } = require('cypress'); // used to define Cypress configuration
const { beforeRunHook } = require('cypress-mochawesome-reporter/lib'); // Mochawesome reporter hook for initial setup
const dotenv = require('dotenv'); // to load environment variables from .env file
const fs = require('fs'); // Node.js File System module for file operations
const path = require('path'); // Node.js module for handling file paths
dotenv.config(); // load environment variables from a .env file

// define and export Cypress configuration
module.exports = defineConfig({
  // set the default viewport for tests (width x height)
  viewportWidth: 1366, // width of the viewport for tests
  viewportHeight: 768, // height of the viewport for tests

  // set timeouts for page loading and commands
  pageLoadTimeout: 120000, // timeout for page load in milliseconds
  defaultCommandTimeout: 12000, // timeout for Cypress commands in milliseconds

  // disable video recording for test runs (set to true to enable)
  video: false,

  // configure the reporter to generate Mochawesome reports
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true, // enable charts in the report
    reportDir: 'cypress/reports', // directory to save reports
    reportFilename: '[status]_[datetime]-[name]-report', // custom report filename format
    overwrite: false, // don't overwrite existing reports
    html: true, // generate an HTML report
    json: true, // generate a JSON report
    reportPageTitle: 'ROSIA DBS Automation Test Report', // title for the report page
    embeddedScreenshots: true, // embed screenshots in the report
    inlineAssets: true, // inline assets like CSS and images in the report
    saveAllAttempts: false, // save only the last attempt of a failed test
    code: true, // include code snippets in the report
    autoOpen: false, // don't automatically open the report after the run
  },

  // set environment variables for Cypress (using the values from the .env file)
  env: { ...process.env },

  // E2E test configuration
  e2e: {
    // disable chrome web security for tests (useful for cross-origin requests)
    chromeWebSecurity: false,

    // enable experimental WebKit support (for certain browsers)
    experimentalWebKitSupport: true,

    // enable experimental origin dependencies feature (supports cross-origin access)
    experimentalOriginDependencies: true,

    // disable automatic watching for file changes (can be useful in CI environments)
    watchForFileChanges: false,

    // set the download folder location for test files
    downloadsFolder: 'cypress/downloads',

    // setup Node.js events (such as custom hooks and tasks)
    setupNodeEvents(on, config) {
      // hook that runs before the tests start to initialize the Mochawesome reporter
      on('before:run', async (details) => {
        await beforeRunHook(details); // initialize Mochawesome reporter with details
      });

      // define a custom Cypress task to monitor and return the downloaded file
      on('task', {
        // task to monitor the downloads folder and return the downloaded file
        getDownloadedFile({ downloadsFolder, filePrefix }) {
          return new Promise((resolve, reject) => {
            // function to repeatedly check for the downloaded file
            const checkForFile = () => {
              fs.readdir(downloadsFolder, (err, files) => {
                if (err) return reject(err); // reject on error

                // filter files that start with the specified prefix and end with .csv
                const matchingFiles = files.filter(
                  (file) => file.startsWith(filePrefix) && file.endsWith('.csv')
                );

                // if a matching file is found, resolve with the filename
                if (matchingFiles.length > 0) {
                  resolve(matchingFiles[0]);
                } else {
                  setTimeout(checkForFile, 500); // retry every 500ms if no file found
                }
              });
            };
            checkForFile(); // start checking for the file
          });
        },
      });

      // load environment-specific settings (from a JSON file based on the environment)
      const environmentName = config.env.environmentName || 'qa'; // default to 'qa' if no environment is specified
      const environmentFilename = `./${environmentName}.settings.json`; // path to environment-specific settings file
      console.log('loading %s', environmentFilename); // log the environment settings filename

      // load the settings from the JSON file
      const settings = require(environmentFilename);

      // set the base URL for the tests from the environment settings
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }

      // merge any additional environment variables into the Cypress config
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }
      console.log('loaded settings for environment %s', environmentName); // log that the settings were loaded

      // IMPORTANT: return the updated config object to Cypress
      return config;
    },

    // exclude specific spec files from being run
    excludeSpecPattern: [
      '**/cypress/e2e/1-getting-started', // exclude getting-started spec files
      '**/cypress/e2e/2-advanced-examples', // exclude advanced-examples spec files
    ],

    // define the pattern for the spec files to run
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // run all spec files with these extensions

    // specify the support file for end-to-end tests
    supportFile: 'cypress/support/e2e.js', // path to the support file
  },
});
