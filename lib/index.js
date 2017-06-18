const filesystem = require('./service/filesystem');
const path = require('path');
const markdown = require('./service/markdown');
const R = require('ramda');
const Result = require('folktale/data/result');
const utils = require('./service/utils');

const initializeContentStructure = filePath => ({
  path: filePath,
  metadata: {},
  content: filesystem.safeGetFileContent(filePath)
});

/**
 * build :: String -> void
 * Build the Barlafus blog
 */
const build = projectDir => {
  const logger = utils.getLogger(projectDir);
  const settings = utils.loadSettings(projectDir);
  const blogDraftsDir = path.join(projectDir, 'website', 'content', 'drafts', 'blog');

  const getContent = R.compose(
    R.map(R.map(initializeContentStructure)),
    R.map(R.filter(markdown.isMarkdown)),
    filesystem.safeGetFilesInDirectory
  );
  
  const pippo = getContent(blogDraftsDir);

  //console.log(files.merge());
  console.log(pippo);
  // Cicla su draft, se e' in stato ready, spostalo tra i published
};

module.exports = build;
