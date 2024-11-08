const { defineConfig } = require("cypress");
const { beforeRunHook } = require("cypress-mochawesome-reporter/lib");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  viewportWidth: 1366, //1920,
  viewportHeight: 768, //1080,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 12000,
  video: false,
  // retries: {openMode:2, runMode: 1},

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports",
    reportFilename: "[status]_[datetime]-[name]-report",
    overwrite: false,
    html: true,
    json: true,
    reportPageTitle: "ROSIA DBS Automation Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    code: true,
    autoOpen: false,
  },
  env: { ...process.env },
  e2e: {
    chromeWebSecurity: false,
    experimentalWebKitSupport: true,
    experimentalOriginDependencies: true,
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here

      // require("cypress-mochawesome-reporter/plugin")(on);
      on("before:run", async (details) => {
        await beforeRunHook(details);
      });

      const environmentName = config.env.environmentName || "qa";
      const environmentFilename = `./${environmentName}.settings.json`;
      console.log("loading %s", environmentFilename);
      const settings = require(environmentFilename);
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }
      console.log("loaded settings for environment %s", environmentName);

      // IMPORTANT: return the updated config object
      // for Cypress to use it

      return config;
    },
    excludeSpecPattern: [
      "**/cypress/e2e/1-getting-started",
      "**/cypress/e2e/2-advanced-examples",
    ],
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
  },
});
