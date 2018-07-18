'use strict';

const acquit = require('acquit');
const fs = require('fs');

require('acquit-ignore')();
require('acquit-markdown')(acquit, { it: true });

acquit.output(function(str) {
  return str.replace(/acquit:ignore:end\s+/g, '');
});

let markdown =
  acquit.parse(fs.readFileSync('./test/example.test.js', 'utf8'));

fs.writeFileSync('./README.md', markdown);
