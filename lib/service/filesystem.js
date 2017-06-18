const fs = require('fs');
const path = require('path');
const R = require('ramda');
const Result = require('folktale/data/result');

/**
 * isDirectory :: String -> Boolean | Error
 * Verify if given input is directory
 */
const isDirectory = src => fs.statSync(src).isDirectory();

/**
 * getFilesInDirectory :: String -> [String] | Error
 * Return all service functions
 */
const getFilesInDirectory = R.ifElse(
  isDirectory,
  dir => Array.prototype.concat(...fs.readdirSync(dir).map(f => getFilesInDirectory(path.join(dir, f)))),
  R.of
);

const safeGetFilesInDirectory = src => Result.try(() => getFilesInDirectory(src));

const safeGetFileContent = src => Result.try(() => fs.readFileSync(src));

module.exports = {
  safeGetFileContent,
  safeGetFilesInDirectory
};
