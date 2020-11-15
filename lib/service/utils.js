const createBarlafusLogger = require('barlafus-logger');
const path = require('path');
const R = require('ramda');
const Result = require('folktale/data/result');

// safeRequire :: String -> Result a Error
const safeRequire = (filePath) => Result.try(() => require(filePath));

/**
 * getLogger :: String -> Object | process.exit
 * Get the Barlafus logger given the project directory
 */
const getLogger = (projectDir) => {
  const logger = createBarlafusLogger(projectDir);
  if (logger instanceof Error) {
    console.log(logger);
    process.exit(1);
  }

  return logger;
};

/**
 * safeRequire :: path -> String -> Result Object Error
 * Load settings by joining default and project ones.
 */
const loadSettings = (projectDir) => {
  const projectSettingsPath = Result.try(() => path.join(projectDir, 'website', 'settings.json'));
  const loadProjectSettings = R.chain(safeRequire);
  const mergeLift = R.lift(R.merge);

  const defaultSettings = safeRequire(path.join(__dirname, '..', 'settings', 'default.json'));
  const projectSettings = loadProjectSettings(projectSettingsPath);

  return mergeLift(defaultSettings, projectSettings);
};

module.exports = {
  getLogger,
  loadSettings,
};
