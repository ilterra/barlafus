const path = require('path');
const R = require('ramda');
const Result = require('folktale/data/result');

const isMarkdown = src => R.contains(path.extname(src), ['.markdown', '.mdown', '.mkdn', '.md', '.mkd', '.mdwn']);

module.exports = {
  isMarkdown
};
