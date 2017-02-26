[![npm package](https://badge.fury.io/js/httpr-provider-xhr.svg)](https://badge.fury.io/js/httpr-provider-xhr)
[![Build Status](https://travis-ci.org/RecuencoJones/httpr-provider-xhr.png?branch=develop)](https://travis-ci.org/RecuencoJones/httpr-provider-xhr)

# httpr-provider-xhr

Httpr provider implementation for browser requests with XMLHttpRequest.

## Import

The library requires a peer of Httpr.

### ES6 import

```
import {Httpr} from 'httpr';
import {XHRProvider} from 'httpr-provider-xhr';

const http = new Httpr({
  provider: new XHRProvider()
});
```

### Commonjs

```
const Httpr = require('httpr').Httpr;
const XHRProvider = require('httpr-provider-xhr').XHRProvider;

const http = new Httpr({
  provider: new XHRProvider()
});
```

### Browser

```
<script src="path/to/lodash.js"></script>
<script src="path/to/dist/httpr[.min].js"></script>
<script src="path/to/dist/httpr-provider-xhr[.min].js"></script>

<script>
  var http = new httpr.Httpr({
    provider: new httprProviderXhr.XHRProvider()
  });
</script>
```

## Type Definitions

For TypeScript usage, a file with type definitions is bundled in npm.

This file is generated using [barrel-defgen](https://github.com/RecuencoJones/barrel-defgen).

## Building

```
npm install
npm run build
```

These commands will setup the package and generate the distributable files as well as the type definitions.

Other tasks:

- `npm run build:umd` - generate library bundle.
- `npm run build:min` - generate minified library bundle.
- `npm run build:defs` - generate definitions from barrel to `defs` directory.
- `npm run clean` - remove generated directories.
- `npm run lint` - check style of source files.
- `npm run doc` - generate documentation from sources to `doc` directory.
- `npm run test` - run all test suites.
- `npm run test:unit` - run unit tests only.
