const fs = require('fs');
const package = JSON.parse(fs.readFileSync('./package.json'));
const project = JSON.parse(fs.readFileSync('./projects/angular-formio/package.json'));
if (project.version !== package.version) {
  process.exit(1);
}
process.exit(0);
