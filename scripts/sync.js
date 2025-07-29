const fs = require('fs');
const package = JSON.parse(fs.readFileSync('./package.json'));
const project = JSON.parse(fs.readFileSync('./projects/angular-formio/package.json'));
project.version = package.version;
fs.writeFileSync('./projects/angular-formio/package.json', JSON.stringify(project, null, 2));
