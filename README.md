# NgFormio
[![Build Status](https://travis-ci.org/formio/angular-formio.svg?branch=master)](https://travis-ci.org/formio/angular-formio)
[![codecov](https://codecov.io/gh/formio/angular-formio/branch/master/graph/badge.svg)](https://codecov.io/gh/formio/angular-formio)
[![npm version](https://badge.fury.io/js/angular-formio.svg)](http://badge.fury.io/js/angular-formio)
[![devDependency Status](https://david-dm.org/formio/angular-formio/dev-status.svg)](https://david-dm.org/formio/angular-formio?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/formio/angular-formio.svg)](https://github.com/formio/angular-formio/issues)
[![GitHub stars](https://img.shields.io/github/stars/formio/angular-formio.svg)](https://github.com/formio/angular-formio/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/formio/angular-formio/master/LICENSE)

## Demo
https://formio.github.io/angular-formio/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

The Form.io dynamic form and data management system for Angular.

## Installation

Install through npm:
```
npm install --save angular-formio
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { FormioModule } from 'angular-formio';

@NgModule({
  imports: [
    FormioModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/formio/angular-formio/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/angular-formio/bundles/angular-formio.umd.js"></script>
<script>
    // everything is exported angularFormio namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://formio.github.io/angular-formio/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
